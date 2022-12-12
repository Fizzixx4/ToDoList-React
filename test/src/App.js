import Task from './components/Task';
import React, { Component } from 'react';
import FormAddTask from './components/FormAddTask';

class App extends Component {

  constructor(props){
    super(props);
    // State est ici une propriété de type objet
    this.state = {
      tasks: [
        {title: "Apprendre Reactjs", id:'1', isValidate: false},
        {title: "Apprendre l'Anglais", id:'2', isValidate: false}],
      displayForm : false,
    }
    console.log("Dans le constructeur");
  }

  handleSubmitAddTask = (taskTitle) => {//this sera forcément l'instance de l'APP grâca à la fonction fléchée
    const copyState = {...this.state};
    copyState.tasks.unshift({
      title: taskTitle, 
      id:copyState.tasks.length +1, 
      isValidate: false
    });
    copyState.displayForm = false;
    this.setState(copyState);
  }

  componentDidMount(){
    console.log('Dans le componentDidMount');
    //Modificaion du state
    //Dans une fonction fléchée, this représente la classe dans laquelle la fonction a été déclarée
    setTimeout(() => { 
      const newTask = [...this.state.tasks,
      {title: "Apprendre Angularjs", id:'3', isValidate: false},
      {title: "Apprendre l'Italien", id:'4', isValidate: false}
      ];
      this.setState({...this.state, tasks: newTask})}, 3000);
  }

  handleClickValidateTask = (event, index) =>{
    //Il faut modifier le state, en particulier isValidate de la tâche qui correspond au bouton
    const copyState = {...this.state};
    copyState.tasks[index].isValidate = !copyState.tasks[index].isValidate;
    this.setState(copyState);
  }

  render(){
    console.log("Dans le render");
    return (
      <div className="App container mt-3">
        <button className='btn btn-danger' onClick={()=>{
            const copyState = {...this.state};
            copyState.displayForm = !copyState.displayForm;
            //Pour modifier le state, on est obligé de passer par un mutateur ou setter
            this.setState(copyState);
        }}>Ajouter une tâche</button>
        {this.state.displayForm && <FormAddTask handleSubmitAddTask={this.handleSubmitAddTask}/>}
        {this.state.tasks.map((task,index) => (
          /** Equivalent à new Task(task.title) */
          <Task 
            title = {task.title} 
            key={task.id} 
            isValidate = {task.isValidate}
            handleClickValidateTask = {this.handleClickValidateTask}
            index = {index}
           />
        ))}
      </div>
    );
  }
}

export default App;