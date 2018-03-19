import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OrgChart from './components/OrgChart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Your personal organization chart!</h1>
        </header>
        <OrgChart />
      </div>
    );
  }
}

export default App;
