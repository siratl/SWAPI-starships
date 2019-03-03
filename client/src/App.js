import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

import Login from './Login/Login';
import Home from './Home/Starships';
import Starship from './Home/Starship';
import Register from './Register/Register';
import Upload from './Upload/Upload';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav className="Nav-bar">
            <NavLink to="/">Home</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/login">Login</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/register">Register</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/upload">Upload</NavLink>
          </nav>
        </header>
        <main>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="/starship" component={Starship} />
          <Route path="/register" component={Register} />
          <Route path="/upload" component={Upload} />
        </main>
        <footer className="footer">footer</footer>
      </div>
    );
  }
}

export default App;
