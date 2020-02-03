import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import { Button, TextInput } from '../Utils/Utils';
import UserContext from '../../contexts/UserContext';
import './RegistrationForm.css';

export default class RegistrationForm extends Component {
  static contextType = UserContext;
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { error: null };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      username: username.value,
      password: password.value
    })
      .then(() => {
        AuthApiService.postLogin({
          username: username.value,
          password: password.value
        }).then((res) => {
          TokenService.saveAuthToken(res.authToken);
        });
      })
      .then(() => {
        username.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    console.log(this);
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="user_name">
          <TextInput
            props={{
              name: 'username',
              label: 'Username',
              placeholder: 'ex. dunderMifflin',
              autoComplete: 'off',
              autoFocus: true,
              type: 'text',
              required: true,
              error: error,
              id: 'RegistrationForm__username'
            }}
          />
        </div>
        <div className="password">
          <TextInput
            props={{
              label: 'Password',
              name: 'password',
              placeholder: 'ex. password',
              type: 'password',
              error: error,
              autoComplete: 'off',
              required: true,
              id: 'RegistrationForm__password'
            }}
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    );
  }
}
