const FormTask = (props) => {
    const getInputTitle = () => {
        if(props.displayForm.type === 'update'){
            return (
                <input type="text" id="label" onChange={()=>{

                }} value={props.task.label} required/>
            )
        }
        else{
            return(
                <input type="text" id="label" required/>
            )
        }
    }
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
                <label className="me-3" htmlFor="label">Titre</label>
                {getInputTitle()}
            </div>
            <div className="my-2 d-flex">
                <label className="me-3" htmlFor="description">Description</label>
                <input type="text" id="description"/>
            </div>
            <div className="my-2 d-flex">
                <label className="me-3" htmlFor="ended">Date de fin de tâche</label>
                <input type="date" id="ended"/>
            </div>
            {props.displayForm.type ==='add' && <input className="btn btn-primary" type="submit" value="Ajouter une tâche"/>}
            {props.displayForm.type ==='update' && <input className="btn btn-primary" type="submit" value="Mettre à jour"/>}
            <button 
            onClick={(event) => {
                event.stopPropagation();
                props.setDisplayForm({type:'none'})}}
            className="btn btn-danger mt-2">Retour</button>
        </form>        
    );
}

export default FormTask;