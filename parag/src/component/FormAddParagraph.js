const FormAddParagraph = (props) => {
    return(
        <form className=' container d-flex justify-content-around' action="">
          <div>
            <label className='me-3' htmlFor="title">Titre</label>
            <input type="text" id='title'/> 
          </div>
          <div>
            <label className='me-3' htmlFor="content">Description</label>
            <input type="textarea" id='content'/>
          </div>
          <input 
          onClick={(e)=>{
            e.preventDefault();
            console.log('hello');
            const title = document.querySelector('#title').value;
            const content = document.querySelector('#content').value;
            props.handleSubmitAddParagraph(title,content);
          }}
          className='btn btn-danger' type="submit" value="Ajouter"/>
        </form>
    )
}

export default FormAddParagraph;