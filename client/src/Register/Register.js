import React, { Component } from 'react';
import axios from 'axios';

import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Register extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const url = 'http://localhost:4000/api/register';
    axios
      .post(url, this.state)
      .then(res => {
        this.props.history.push('/login');
      })
      .catch(err => console.error(err));
  };
  render() {
    return (
      <div className="register">
        <Form className="register-form" onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <FormGroup row>
            <Label for="username" sm={2}>
              Username
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
                name="username"
                id="username"
                placeholder="username"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>
              Password
            </Label>
            <Col sm={10}>
              <Input
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                id="Password"
                placeholder="password"
              />
            </Col>
          </FormGroup>
          <FormGroup
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            check
            row
          >
            <Button type="submit">Register</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Register;
