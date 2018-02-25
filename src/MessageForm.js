import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

// Each SMS message has at most 160 characters. 
// Here it can support at most 3 messages in one go.
const MAX_MESSAGE = 480;

// Validate the mobile
// @param string mobile
// @return boolean
function validateMobile(mobile) {
  // Here we only support Australia mobile number
  return mobile !== '' && /^0\d{9}$/.test(mobile)
}

// Validate the message
// @param string message
// @return boolean
function validateMessage(message) {
  return message !== '' && message.length <= MAX_MESSAGE;
}

// Convert mobile number like: 0430948926 to 61430948926
// @param string mobile
// @return string
function convertMobile(mobile) {
  return `61${mobile.substr(1)}`;
}

export default class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendDisabled: true,
      mobile: '',
      message: '',
      sendSuccess: false,
      sendFail: false
    };
    this.onMobileChange = this.onMobileChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
  }

  onMobileChange(e) {
    const value = e.target.value;
    this.setState({
      mobile: value,
      sendDisabled: !validateMobile(value) || !validateMessage(this.state.message),
      sendSuccess: false,
      sendFail: false
    });
  }

  onMessageChange(e) {
    const value = e.target.value;
    this.setState({
      message: value,
      sendDisabled: !validateMobile(this.state.mobile) || !validateMessage(value),
      sendSuccess: false,
      sendFail: false
    });
  }

  onSendClick(e) {
    e.preventDefault();
    this.setState({
      sendDisabled: true,
      sendSuccess: false,
      sendFail: false
    });
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
      .then(res => {
        const result = res.ok ? {
          sendSuccess: true,
          mobile: '',
          message: '',
        } : {
            sendFail: true
          };
        this.setState({
          sendDisabled: false,
          ...result
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          sendDisabled: false
        });
      });
  }

  render() {
    return (
      <div className="Message-form">
        {this.state.sendSuccess && <Alert color="success">
          Message sending succeeded.
          </Alert>
        }
        {this.state.sendFail && <Alert color="warning">
          Message sending failed.
          </Alert>
        }
        <Form>
          <FormGroup>
            <Label for="mobile">Mobile number:</Label>
            <Input type="text" id="mobile" value={this.state.mobile} onChange={this.onMobileChange} placeholder="Mobile Number" />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message ({this.state.message.length} / {MAX_MESSAGE}):</Label>
            <Input type="textarea" name="text" maxLength={MAX_MESSAGE} value={this.state.message} onChange={this.onMessageChange} id="message" />
          </FormGroup>
          <Button color="primary" onClick={this.onSendClick} disabled={this.state.sendDisabled} >Send</Button>
        </Form>
      </div>
    );
  }
}
