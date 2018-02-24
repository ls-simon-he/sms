import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const MAX_MESSAGE = 480;

function validateMobile(mobile) {
  // Here we only support Australia mobile number
  return mobile !== '' && /^0\d{9}$/.test(mobile)
}

function validateMessage(message) {
  return message !== '' && message.length <= MAX_MESSAGE;
}

function convertMobile(mobile) {
  return `61${mobile.substr(1)}`;
}

export default class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendDisabled: true,
      mobile: '',
      message: ''
    };
    this.onMobileChange = this.onMobileChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
  }

  onMobileChange(e) {
    const value = e.target.value;
    this.setState({
      mobile: value,
      sendDisabled: !validateMobile(value) || !validateMessage(this.state.message)
    });
  }

  onMessageChange(e) {
    const value = e.target.value;
    this.setState({
      message: value,
      sendDisabled: !validateMobile(this.state.mobile) || !validateMessage(value)
    });
  }
 
  onSendClick(e) {
    e.preventDefault();
    const data = {
      mobile: convertMobile(this.state.mobile),
      message: this.state.message
    };
    fetch('/send', {
      body: JSON.stringify(data),
      cache: 'no-cache',
      credentials: 'same-origin',
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
      <div className="Message-form">
        <Form>
          <FormGroup>
            <Label for="mobile">Mobile number:</Label>
            <Input type="text" id="mobile" value={this.state.mobile} onChange={this.onMobileChange} placeholder="Mobile Number" />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message({this.state.message.length}):</Label>
            <Input type="textarea" name="text" value={this.state.message} onChange={this.onMessageChange} id="message" />
          </FormGroup>
          <Button color="primary" onClick={this.onSendClick} disabled={this.state.sendDisabled} >Send</Button>
        </Form>
      </div>
    );
  }
}