const Task = (props) => {
    return (
      <section className="d-flex justify-content-between">
        <h2>{props.task.title}</h2>
        <div>
            <button className="btn btn-success me-3"
            onClick={
                (event)=>{
                    props.handleClickValidateTask();
                }
            }
            >Valider</button>
          <button className="btn btn-danger">Supprimer</button>
        </div>
      </section>
    );
  };
  
  export default Task;