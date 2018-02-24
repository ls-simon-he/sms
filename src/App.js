import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      mobile: '',
      message: ''
    };
    this.onMobileChange = this.onMobileChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
  }

  onMobileChange(e) {
    this.setState({
      mobile: e.target.value
    });
  }

  onMessageChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  onSendClick(e) {
    e.preventDefault();
    const data = {
      mobile: this.state.mobile,
      message: this.state.message
    };
    fetch('/send', {
      body: JSON.stringify(data), 
      cache: 'no-cache',
      credentials: 'same-origin', // include, *omit
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => {
      const result = response.json();
      console.log(result);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SMS Demo</h1>
        </header>
        <div className="Message-form">
          <Form>
            <FormGroup>
              <Label for="mobile">Mobile number:</Label>
              <Input type="text" id="mobile" value={this.state.mobile} onChange={this.onMobileChange} placeholder="Mobile Number" />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message:</Label>
              <Input type="textarea" name="text" value={this.state.message} onChange={this.onMessageChange} id="message" />
            </FormGroup>
            <Button color="primary" onClick={this.onSendClick}>Send</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
