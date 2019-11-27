import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderLoggedInItems() {
    return (
      <>
        <h2>{TokenService.getAuthName()}</h2>
        <div className="Header__logged-in">
          <Link onClick={this.handleLogoutClick} to="/tic-tac-toe">
            <h3>Logout</h3>
          </Link>
        </div>
      </>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/login">Log in</Link>
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
          {/* {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()} */}
          {TokenService.hasAuthToken() ? this.renderLoggedInItems() : () => {}}
        </nav>
      </>
    );
  }
}
