const FormTask = (props) => {
  //Affichage du titre de la tâche dans le formulaire en contexte update
  const getInputTitle = () => {
    if (props.displayForm.type === "update") {
      return (
        <input
          type="text"
          id="label"
          onChange={() => {}}
          value={props.task.label}
          required
        />
      );
    } else {
      return <input type="text" id="label" required />;
    }
  };

//   const getInput = () =>
//     task?.label ? (
//       <input
//         type="text"
//         id="label"
//         onChange={() => {}}
//         value={props.task.label}
//         required
//       />
//     ) : (
//       <input type="text" id="label" required />
//     );

  //Affichage de la description de la tâche dans le formulaire en contexte update
  const getInputDescription = () => {
    if (props.displayForm.type === "update") {
      return (
        <input
          type="text"
          id="description"
          onChange={() => {}}
          value={props.task.description}
          required
        />
      );
    } else {
      return <input type="text" id="description" required />;
    }
  };

  //Affichage de la date de fin de la tâche dans le formulaire en contexte update
  const getInputDate = () => {
    if (props.displayForm.type === "update") {
      return (
        <input
          type="date"
          id="ended"
          onChange={() => {}}
          value={props.task.ended}
          required
        />
      );
    } else {
      return <input type="date" id="ended" required />;
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const label = document.querySelector("#label").value;
        const description = document.querySelector("#description").value;
        const ended = document.querySelector("#ended").value;
        props.handleSubmitAddTask(label, description, ended);
      }}
      className="d-flex flex-column align-items-center my-4 w-100"
    >
      <div className="my-2 d-flex">
        <label className="me-3" htmlFor="label">
          Titre
        </label>
        {getInputTitle()}
      </div>
      <div className="my-2 d-flex">
        <label className="me-3" htmlFor="description">
          Description
        </label>
        {getInputDescription()}
      </div>
      <div className="my-2 d-flex">
        <label className="me-3" htmlFor="ended">
          Date de fin de tâche
        </label>
        {getInputDate()}
      </div>
      {props.displayForm.type === "add" && (
        <input
          className="btn btn-primary"
          type="submit"
          value="Ajouter une tâche"
        />
      )}
      {props.displayForm.type === "update" && (
        <input
          className="btn btn-primary"
          type="submit"
          value="Mettre à jour"
        />
      )}
      <button
        onClick={(event) => {
          event.stopPropagation();
          props.setDisplayForm({ type: "none" });
        }}
        className="btn btn-danger mt-2"
      >
        Retour
      </button>
    </form>
  );
};

export default FormTask;
