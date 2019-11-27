import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Section } from '../../components/Utils/Utils';
import { Link } from 'react-router-dom';

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/';
    history.push(destination);
  };

  render() {
    return (
      <Section className="LoginPage">
        <p>Not Registered?</p>
        <Link to="/register">
          <p>Register</p>
        </Link>
        <h2>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </Section>
    );
  }
}
