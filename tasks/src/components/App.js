import Coopernet from "./../services/Coopernet";
import { useState, useEffect } from "react";
import Task from "./Task";
import FormAddTask from "./FormAddTask";

const initial_value = [];
function App() {
  // Déclare une nouvelle variable d'état, que l'on va appeler « tasks »
  // useState renvoie un tableau. Le premier élément de ce dernier est un état et le deuxième élément est une référence vers la fonction qui permet de modifier cet état.
  const [tasks, setTasks] = useState(initial_value);
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
          Coopernet.setUsername("y");
          Coopernet.setPassword("y");
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

  /**
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
  };

  /**
   * Gère le click sur le bouton Valider/Invalider pour barrer la tâche
   */
  const handleClickValidateTask = (id) => {
    console.log(`Dans handleClickValidateTask`);
    setTasks(
      tasks.map((task) => {
        if (task.id === id) task.isValidate = !task.isValidate;
        return task;
      })
    );
  };


  return (
    <div className="App container">
      <h1>Liste des tâches</h1>
      <FormAddTask/>
      <h2>Tâches En cours</h2>
      {tasks.filter(task => !task.isValidate).map((task, index) => (
        <Task
          task={task}
          key={task.id}
          handleClickDeleteTask={handleClickDeleteTask}
          handleClickValidateTask={handleClickValidateTask}
          index={index}
        />
      ))}
      <h2>Tâches Terminées</h2>
      {tasks.filter(task => task.isValidate).map((task, index) => (
        <Task
          task={task}
          key={task.id}
          handleClickDeleteTask={handleClickDeleteTask}
          handleClickValidateTask={handleClickValidateTask}
          index={index}
        />
      ))}
    </div>
  );
}

export default App;