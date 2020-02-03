import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import { Button, TextInput } from '../Utils/Utils';
import './LoginForm.css';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  state = { error: null };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { username, password } = ev.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then((res) => {
        username.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="username">
          <TextInput
            props={{
              required: true,
              label: 'Username',
              placeholder: '',
              autoComplete: 'username',
              name: 'username',
              id: 'LoginForm__username'
            }}
          />
        </div>
        <div className="password">
          <TextInput
            props={{
              required: true,
              label: 'Password',
              autoComplete: 'current-password',
              name: 'password',
              type: 'password',
              id: 'LoginForm__password'
            }}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    );
  }
}
