import React, { Component } from 'react';
import Paragraph from './component/Paragraph';
import FormAddParagraph from './component/FormAddParagraph'

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      paragraphes: [
        {title: "Titre 1", content: "Description 1", id: "1", displayContent : false},
        {title: "Titre 2", content: "Description 2", id: "2", displayContent : false}
      ]
    }
  }

  handleSubmitAddParagraph = (paragraphTitle, paragraphContent) =>{
    const copyState = {...this.state};
    copyState.paragraphes.unshift({
      title: paragraphTitle,
      content: paragraphContent,
      id: copyState.paragraphes.length +1,
      displayContent : false
    })
    this.setState(copyState);
  }

  handleOnClickDisplayContent = (index) => {
    const copyState = {...this.state};
    copyState.paragraphes[index].displayContent = !copyState.paragraphes[index].displayContent;
    this.setState(copyState);
  }

  render(){
    return (
      <div className="App container mt-4">
        <FormAddParagraph handleSubmitAddParagraph = {this.handleSubmitAddParagraph}/>
        {this.state.paragraphes.map((paragraph, index)=> (
          <Paragraph 
          //On met en attribut l'objet lui-même pour le detructurer dans Paragraph afin d'éviter la surcharge des attributs ici
          paragraph = {paragraph}
          key = {paragraph.id}
          handleOnClickDisplayContent = {this.handleOnClickDisplayContent}
          index = {index}
          />
        ))}
      </div>
    );
  }

}

export default App;