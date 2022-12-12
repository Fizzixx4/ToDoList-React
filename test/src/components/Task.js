const Task = (props) => {
    return (
    <section className="d-flex justify-content-between border p-3 mt-3">
        <h2 className={props.isValidate ? "text-decoration-line-through":""}>{props.title}</h2>
        <div>
            <button 
            /*gérer le onClick sur le bouton valider*/
            onClick = {(event)=>{
                props.handleClickValidateTask(event, props.index);
            }}
            className="btn btn-success me-2">{props.isValidate ? 'Invalider':"Valider"}</button>
            <button className="btn btn-warning">Mettre à jour</button>
        </div>
    </section>    
    );
}

export default Task;