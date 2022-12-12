import React, {Component} from "react";

class App extends Component{
  
  constructor(props){
    super(props);
    this.state ={
      regions: [
        fetch('https://geo.api.gouv.fr/regions')
        .then(x =>x.json())
        .then(json => console.log(json))
      ]
    }
  }

  render(){
    return (
      <p></p>
    )
  }
}

export default App;