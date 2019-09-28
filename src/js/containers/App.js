import React, { Component } from 'react';

import '../../assets/styles/App.css';
import NavigationPanel from '../components/Navigation/NavigationPanel'

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
