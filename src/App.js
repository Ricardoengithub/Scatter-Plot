import React from 'react';
import './App.css';
import Scatter from './Scatter';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
    }
  }

  render(){
    return(
        <div>
          <Scatter />
        </div>
    )
  }
}

export default App;

