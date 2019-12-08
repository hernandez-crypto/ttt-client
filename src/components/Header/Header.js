import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import { Button } from '../Utils/Utils';
import './Header.css';

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderLogoutLink() {
    return (
      <>
        <h2>{TokenService.getAuthName()}</h2>
        <Button className="Header__logged-in">
          <Link onClick={this.handleLogoutClick} to="/">
            Logout
          </Link>
        </Button>
      </>
    );
  }
  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }

  render() {
    return (
      <>
        <nav className="Header">
          <h1>
            <Link to="/">Tic-Tac-Toe</Link>
          </h1>
          <span className="Header__tagline--wide"></span>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
          {/* <Button>Darkmode</Button> */}
        </nav>
      </>
    );
  }
}
