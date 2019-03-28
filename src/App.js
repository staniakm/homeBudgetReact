import React, { Component } from 'react';

import './App.css';
import NavigationPanel from './navigation/NavigationPanel'

class App extends Component {

  state = {
    isLoading: false,
  }

  render() {
    return (
      <div className="App">
        <h1>Budżet domowy</h1>
        <NavigationPanel />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
