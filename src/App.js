import React, { Component } from 'react';

import './App.css';
import NavigationPanel from './Navigation/NavigationPanel'

class App extends Component {

  state = {
    isLoading: false,
  }

  render() {
    return (
      <div className="App">
        <NavigationPanel />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
