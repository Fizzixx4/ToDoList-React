import Coopernet from "./../services/Coopernet";
import { useState, useEffect } from "react";
import Task from "./Task";
import FormTask from "./FormTask";
import Login from "./Login";

const initial_value = [];
function App() {
  // Déclare une nouvelle variable d'état, que l'on va appeler « tasks »
  // useState renvoie un tableau. Le premier élément de ce dernier est un état et le deuxième élément est une référence vers la fonction qui permet de modifier cet état.
  const [tasks, setTasks] = useState(initial_value);
  const [displayForm, setDisplayForm] = useState({type : 'none', taskIndex : -1});
  const [session, setSession] = useState({user : '', pwd : '', isConnected : false});

  const fetchTask = async () => {
    // Récupération des tâches :
    const server_tasks = await Coopernet.getTasks();
    console.log(`tasks récupérées sur le serveur : `, server_tasks);

    // Modification du state tasks
    setTasks(server_tasks);
  };

  // Equivalent du componentDidMount si le deuxième paramètre de useEffect est []
  useEffect(() => {
    const testLocalStorageToken = async () => {
      try {
        if (await Coopernet.getStorage()) {
          console.log(
            `Je suis dans le cas où mon local storage me permet de me connecter`
          );
          await fetchTask();
        } else {
          // Je modifie le login et le mot de passe
          // Il faudra faire en sorte d'appeler ici le component de formulaire
          // de login
          Coopernet.setUsername("gregory2koch");
          Coopernet.setPassword("gregory2koch");
          await Coopernet.setOAuthToken();
          // Si ce code est exécuté, c'est que je suis bien connecté
          console.log(
            `Je suis maintenant bien connecté au serveur de Coopernet`
          );
          // Récupération des tâches :
          await fetchTask();
        }
      } catch (error) {
        // Ici, il faudrait afficher dans l'interface qu'il y a eu une erreur
        // d'identification et donner un email de l'administrateur par exemple
        console.error("Erreur attrapée : " + error);
      }
    };
    testLocalStorageToken();
  }, []);

  const signIn = async (login,pwd) => {
    Coopernet.setUsername(login);
    Coopernet.setPassword(pwd);
    await Coopernet.setPayload(false);
    session.isConnected = true;
  }

  const signOut = async() => {
    Coopernet.setUsername("");
    Coopernet.setPassword("");
    localStorage.removeItem("token");
    await Coopernet.setPayload(true);
    session.isConnected = false;
  }

  /**
   * Gère le click sur le bouton Valider/Invalider pour barrer la tâche
   */
  const handleClickValidateTask = (id) => {
    console.log(`Dans handleClickValidateTask`);
    setTasks(
      tasks.map((task) => {
        if (task.id === id){
          //On fait un +!+ car on reçoit un string et qu'on veut le mettre en booléen numérique
          task.isValidate = +!+task.isValidate;
          Coopernet.updateTask(task,tasks.length);
        }
        return task;
      })
    );
  };

  /**
   * Ajout d'une tâche dans le nouveau state et sur le serveur
   * @param {string} newLabel 
   * @param {string} newDescription 
   * @param {timestamp} newEnded 
   */
  const handleSubmitAddTask = async (newLabel,newDescription,newEnded) => {
    console.log('handleSubmitAddTask')
    const newTask = {label:newLabel, description:newDescription, ended:newEnded, isValidate:0}
    const recupData = await Coopernet.addTask(newTask, tasks.length);
    newTask.id = recupData.id;
    newTask.order = tasks.length;
    newTask.created = recupData.created;
    newTask.isValidate = 0;
    setTasks([...tasks, newTask]);
    displayForm.type = "none";
  };

    /**
     * Suppression de la tâche dans le nouveau state et sur le serveur
   * Gère le click sur le bouton supprimer
   * Utilisation de la méthode filter : si l'index de la tâche cliquée correspond à l'index de la tâche, cette dernière ne passe pas le filtre
   * Appel du mutateur de l'état tasks "setTasks"
   * @param {Number} index
   */
    const handleClickDeleteTask = (id) => {
      console.log(`Dans handleClickDeleteTask`);
      // Teste si l'index de la tâche est bien différent
      // de l'index de la tâche qui contient le bouton supprimer
      // sur lequel l'internaute a cliqué
      setTasks(tasks.filter((task) => task.id !== id));
      Coopernet.deleteTask(id);
    };

    /**
     * Ouverture du formulaire d'update avec le remplissage des champs par rapport à la tâche sélectionnée
     */
    const handleClickUpdateTask = (id) => {
      console.log('dans handleClickUpdateTask')
      const taskIndex = tasks.findIndex(task => {return task.id === id});
      console.log('task.index :', taskIndex);
      setDisplayForm({type: 'update', taskIndex:taskIndex});
    }

    /**
     * Modification de la tâche sélectionnée en local et sur le serveur
     */
    const updateTaskSelected = async (newLabel,newDescription,newEnded,index) => {
      console.log('updateTaskSelected');
      tasks[index].label = newLabel; 
      tasks[index].description = newDescription;
      tasks[index].ended = newEnded;
      setTasks([...tasks]);
      await Coopernet.updateTask(tasks[index], tasks.length);
      setDisplayForm({type:'none',taskIndex:-1});
    };

  return (
    <div className="App container">
        {/** Formulaire de Login */}
        {/* {session.isConnected === false && <Login
          session={session}
          signIn={signIn}
        />} */}
        <div className="d-flex justify-content-between my-3">
          <h1>Liste des tâches</h1>
          <button 
          onClick={()=> signOut()}
          className="btn btn-secondary">Se déconnecter</button>
        </div>
        {/**Formulaire d'ajout d'une tâche */}
        {displayForm.type === 'none' && <button onClick={() => setDisplayForm({type:'add'})}
        className="btn btn-primary fixed">Ajouter une tâche</button>}
        {displayForm.type === 'add' && <FormTask displayForm={displayForm}
          setDisplayForm={setDisplayForm}
          handleSubmitAddTask={handleSubmitAddTask}
        />}
        {/**Formulaire de modification de la tâche */}
        {displayForm.type === 'update' && <FormTask 
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        handleClickUpdateTask={handleClickUpdateTask}
        task={tasks[displayForm.taskIndex]}
        index = {displayForm.taskIndex}
        key={tasks[displayForm.taskIndex].id}
        updateTaskSelected = {updateTaskSelected}
        />}
        {/** Liste des Tâches En cours en se basant sur le isValidate*/}
        <h2 className="my-3">Tâches En cours</h2>
        {tasks.filter(task => parseInt(task.isValidate) !== 1).map((task, index) => (
          <Task
            task={task}
            key={task.id}
            handleClickDeleteTask={handleClickDeleteTask}
            handleClickUpdateTask={handleClickUpdateTask}
            handleClickValidateTask={handleClickValidateTask}
            index={index}//!\\
          />
        ))}
        {/** Liste des Tâches Terminées en se basant sur le isValidate*/}
        <h2 className="my-3">Tâches Terminées</h2>
        {tasks.filter(task => parseInt(task.isValidate) === 1).map((task, index) => (
          <Task
            task={task}
            key={task.id}
            handleClickDeleteTask={handleClickDeleteTask}
            handleClickUpdateTask={handleClickUpdateTask}
            handleClickValidateTask={handleClickValidateTask}
            index={index}//!\\
          />
        ))}
    </div>
  );
}

export default App;