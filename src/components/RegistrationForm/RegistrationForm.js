import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import { Button, Input, Required } from '../Utils/Utils';
import './RegistrationForm.css';

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { error: null };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { user_name, password } = ev.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value
    })
      .then(() => {
        AuthApiService.postLogin({
          user_name: user_name.value,
          password: password.value
        }).then((res) => {
          TokenService.saveLoginInfo(res.authToken, res.user_name, res.user_id);
        });
      })
      .then(() => {
        user_name.value = '';
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
          <label htmlFor="RegistrationForm__user_name">
            User name <Required />
          </label>
          <Input
            name="user_name"
            autoComplete="username"
            type="text"
            required
            id="RegistrationForm__user_name"></Input>
        </div>
        <div className="password">
          <label htmlFor="RegistrationForm__password">
            Password <Required />
          </label>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            id="RegistrationForm__password"></Input>
        </div>
        <Button type="submit">Register</Button>
      </form>
    );
  }
}
