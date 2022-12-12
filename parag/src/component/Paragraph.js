const Paragraph = (props) => {
    //Destructuring pour utiliser les propriétés de l'objet
    const {title,content,displayContent} = props.paragraph
    return (
        <section className="container mt-5">
            <a href="http://localhost:3001/"
            onClick = {(e) => {
                e.preventDefault();
                console.log("hi");
                props.handleOnClickDisplayContent(props.index);
            }}>{title}</a>
           {displayContent && <p>{content}</p>}
        </section>
    );
}

export default Paragraph;