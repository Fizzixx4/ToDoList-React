const FormAddTask = (props) => {
    return (
        <form
        onSubmit={(event) => {
            event.preventDefault();
            const label = document.querySelector('#label').value;
            const description = document.querySelector('#description').value;
            const ended = document.querySelector('#ended').value;
            props.handleSubmitAddTask(label,description,ended);
        }}
        className="d-flex flex-column align-items-center my-4 w-100">
            <div className="my-2 d-flex">
                <label className="me-3" htmlFor="label">Label</label>
                <input type="text" id="label"/>
            </div>
            <div className="my-2 d-flex">
                <label className="me-3" htmlFor="description">Description</label>
                <input type="text" id="description"/>
            </div>
            <div className="my-2 d-flex">
                <label className="me-3" htmlFor="ended">Date de fin de tâche</label>
                <input type="date" id="ended"/>
            </div>
            <input className="btn btn-primary" type="submit" value="Ajouter une tâche"/>
            <button 
            onClick={(event) => {
                event.stopPropagation();
                props.setDisplayForm(!props.displayForm)}}
            className="btn btn-danger mt-2">Retour</button>
        </form>        
    );
}

export default FormAddTask;