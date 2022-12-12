const Paragraph = (props) => {
    //Destructuring pour utiliser les propriétés de l'objet
    const {title,content,displayContent} = props.paragraph
    return (
        <section className="container mt-5 border p-3">
            <div className="d-flex gap-3 my-4 justify-content-between">
                <h2 className="btn"
                //Affichage du content
                onClick = {(e) => {
                    e.preventDefault();
                    console.log("hi");
                    props.handleOnClickDisplayContent(props.index);
                }}>{title}</h2>
                <button className="btn btn-warning"
                //Affichage du form d'update
                onClick={(event) =>{
                    props.handleClickUpdateButton(event,props.index);
                }}>Modifier</button>
            </div>
           {displayContent && <p>{content}</p>}
        </section>
    );
}

export default Paragraph;