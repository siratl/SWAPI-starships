import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to="/home">Home</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/login">Login</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/register">Register</NavLink>
          </nav>
        </header>
        <main>
          <Route path="/login" component={null} />
          <Route exact path="/" component={null} />
          <Route path="/starship" component={null} />
          <Route path="/login" component={null} />
        </main>
        <footer>footer</footer>
      </div>
    );
  }
}

export default App;
