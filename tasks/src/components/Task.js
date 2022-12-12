const Task = (props) => {
    return (
      <section className="d-flex justify-content-between">
        <h2 
        className={props.task.is_validate ? "text-decoration-line-through" : ""}
        >
        {props.task.title}</h2>
        <div>
          <button className="btn btn-success me-3"
          onClick={
            (event)=>{
                props.handleClickValidateTask(props.index);
            }
          }
          >Valider</button>
          <button className="btn btn-danger"
          onClick={
            (event)=>{
                props.handleClickDeleteTask(props.index);
            }
         }
          >Supprimer</button>
        </div>
      </section>
    );
  };
  
  export default Task;