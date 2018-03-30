import React, { Component } from 'react';
import logo from './rhabit-logo.png';
import './App.css'
import OrgChart from './components/OrgChart/OrgChart'
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  align-items: center
  text-align: center;
`

class App extends Component {
  render() {
    return (
      <Container>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Your personal organization chart!</h1>
        </header>
        <OrgChart />
      </Container>
    );
  }
}

export default App;
