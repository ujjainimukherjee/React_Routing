import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Planet from './Planet';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/planets/:id" component={Planet}></Route>
      </div>
    );
  }
}


export default App;