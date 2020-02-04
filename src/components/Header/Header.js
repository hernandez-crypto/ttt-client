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
        <h2>{TokenService.parseAuthToken().sub}</h2>
        <Link onClick={this.handleLogoutClick} to="/offline">
          <Button className="Header__logged-in">Logout</Button>
        </Link>
      </>
    );
  }

  renderLogoutLinkNarrow() {
    return (
      <>
        <Link onClick={this.handleLogoutClick} to="/offline">
          <Button className="Header__logged-in">Logout</Button>
        </Link>
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
          <span className="Header__tagline--wide">
            {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </span>
          <span className="Header__tagline--narrow">
            {TokenService.hasAuthToken()
              ? this.renderLogoutLinkNarrow()
              : this.renderLoginLink()}
          </span>
        </nav>
      </>
    );
  }
}
