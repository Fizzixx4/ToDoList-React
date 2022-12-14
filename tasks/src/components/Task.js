const Task = (props) => {
  return (
    <section className="d-flex justify-content-between border p-3 m-3">
      <h2
        className={parseInt(props.task.isValidate) ? "text-decoration-line-through" : ""}
      >
        {props.task.label}
      </h2>
      <p>{props.task.description}</p>
      <p>{props.task.ended}</p>
      <div>
        <button
          onClick={() => {
            props.handleClickValidateTask(props.task.id);
          }}
          className="btn btn-success me-3"
        >
          {parseInt(props.task.isValidate) ? "Invalider" : "Valider"}
        </button>
        <button 
          onClick={() => {
            props.handleClickUpdateTask(props.task.id);
          }}
          className="btn btn-primary me-3">
          Mettre à jour
        </button>
        <button
          onClick={() => {
            props.handleClickDeleteTask(props.task.id);
          }}
          className="btn btn-danger">
          Supprimer
        </button>
      </div>
    </section>
  );
};

export default Task;