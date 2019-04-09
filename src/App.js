import React, { Component } from 'react';

import './App.css';
import NavigationPanel from './Navigation/NavigationPanel'
import {Link} from 'react-router-dom'
import { Jumbotron} from 'reactstrap';

class App extends Component {

  state = {
    isLoading: false,
  }

  render() {
    return (
      <div className="App">
      <Jumbotron>
      <div className="display-1 app_header">
        <Link to="/">
        <h1>Budżet domowy</h1>
        </Link>
        </div>
        </Jumbotron>
        <NavigationPanel />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
