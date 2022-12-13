const FormAddTask = (props) => {
    return (
        <form className="d-flex justify-content-around my-4">
            <div>
                <label htmlFor="label"></label>
                <input type="text" id="label"/>
            </div>
            <input className="btn btn-primary" type="submit" value="Ajouter une tâche"/>
        </form>        
    );
}

export default FormAddTask;