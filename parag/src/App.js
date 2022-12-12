import React, { Component } from 'react';
import Paragraph from './component/Paragraph';
import FormAddParagraph from './component/FormAddParagraph'
import FormUpdateParagraph from './component/FormUpdateParagraph';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      paragraphes: [
        {title: "Titre 1", content: "Description 1", id: "1", displayContent : false},
        {title: "Titre 2", content: "Description 2", id: "2", displayContent : false}
      ],
      formUpdateIsVisible: false,
      currentUpdateParagraph: -1
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

  handleClickUpdateButton = (event,index) => {
    // const copyState = {...this.state};
    // copyState.formUpdateIsVisible = !copyState.formUpdateIsVisible ;
    // this.setState(copyState);
    
    //Autre manière de faire
    this.setState((previousState)=>(
      {formUpdateIsVisible : !previousState.formUpdateIsVisible,
        currentUpdateParagraph : index
      }))
  }

  handleSubmitUpdateParagraph = (title, content) => {
  
    this.setState({
      paragraphes:this.state.paragraphes.map((paragraph, i) => {
        if(i == this.state.currentUpdateParagraph){
          paragraph.title = title;
          paragraph.content = content;
        }
        return paragraph;
      }),
      formUpdateIsVisible: false,
      currentUpdateParagraph: -1
    });
  };

  render(){
    return (
      <div className="App container mt-4">
        <h1 className='mb-4'>Exercice Paragraphe</h1>
        <FormAddParagraph handleSubmitAddParagraph = {this.handleSubmitAddParagraph}/>
        {/**Affichage du formalaire si formUpdateIsVisible est à true*/}
        {this.state.formUpdateIsVisible && 
        <FormUpdateParagraph paragraph = {this.state.paragraphes[this.state.currentUpdateParagraph]}
          handleSubmitUpdateParagraph = {this.handleSubmitUpdateParagraph}
        />}
        {this.state.paragraphes.map((paragraph, index)=> (
          <Paragraph 
          //On met en attribut l'objet lui-même pour le detructurer dans Paragraph afin d'éviter la surcharge des attributs ici
          paragraph = {paragraph}
          key = {paragraph.id}
          handleOnClickDisplayContent = {this.handleOnClickDisplayContent}
          handleClickUpdateButton = {this.handleClickUpdateButton}
          index = {index}
          />
        ))}
      </div>
    );
  }

}

export default App;