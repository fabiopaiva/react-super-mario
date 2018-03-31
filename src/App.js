import React, { Component } from 'react';
import SuperMarioReact from './react-super-mario';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SuperMarioReact width={800} />
      </div>
    );
  }
}

export default App;
