import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageForm from './MessageForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SMS Demo</h1>
        </header>
        <MessageForm />
      </div>
    );
  }
}

export default App;
