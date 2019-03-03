import React, { Component } from 'react';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };
  render() {
    return (
      <div className="Login-page">
        <h2>Login</h2>
      </div>
    );
  }
}

export default Login;
