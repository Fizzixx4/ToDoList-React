const FormAddTask = (props) => {
    return (
        <form
        onSubmit = {(event)=>{
            const taskTitle = document.querySelector('#task').value;
            event.preventDefault();
            props.handleSubmitAddTask(taskTitle);
        }}
        className="my-4 d-flex align-items-center gap-4">
            <label className="form-label" htmlFor="task">Tâche</label>
            <input className="form-control" type="text" id="task"/>
            <input className="form-control btn btn-danger w-25" type="submit" value="Ajouter" />
        </form>
    );
}

export default FormAddTask;