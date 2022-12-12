const FormUpdateParagraph = (props) => {
    return(
        <form
            onSubmit={(event)=>{
                event.preventDefault();
                const title = event.target.querySelector("#titleUpdate").value;
                const content = event.target.querySelector("#contentUpdate").value;
                props.handleSubmitUpdateParagraph(title,content);
            }}
            className='container d-flex justify-content-around mt-3'>
          <div>
            <label className='me-3' htmlFor="title">Titre</label>
            <input type="text" id='titleUpdate' defaultValue={props.paragraph.title}/> 
          </div>
          <div>
            <label className='me-3' htmlFor="content">Description</label>
            <input type="textarea" id='contentUpdate' defaultValue={props.paragraph.content}/>
          </div>
          <input className='btn btn-danger' type="submit" value="Modifier"/>
        </form>
    )
}

export default FormUpdateParagraph;