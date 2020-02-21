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
        this.props.toggleLoading();
        setTimeout(() => {
          // forcing a timeout for 1 second
          username.value = '';
          password.value = '';
          TokenService.saveAuthToken(res.authToken);
          this.props.onLoginSuccess();
        }, 1000);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="username">
            <TextInput
              props={{
                required: true,
                label: 'Username',
                placeholder: 'Ex. demo',
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
                placeholder: 'Ex. password',
                autoComplete: 'current-password',
                name: 'password',
                type: 'password',
                id: 'LoginForm__password'
              }}
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }
}
