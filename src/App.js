import React, { Component } from 'react';
import logo from './logo.svg';
import ParticleSimDisplay from './ParticleSimDisplay';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
	<ParticleSimDisplay />
      </div>
    );
  }
}

export default App;
