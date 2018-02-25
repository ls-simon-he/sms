import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import MessageForm from './MessageForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title='SMS Demo' />
        <MessageForm />
      </div>
    );
  }
}

export default App;
