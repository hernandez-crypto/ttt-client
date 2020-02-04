import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';

const UserContext = React.createContext({
  user: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {}
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    const state = { user: {}, error: null };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        username: jwtPayload.sub
      };

    this.state = state;
  }

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUser = (user) => {
    this.setState({ user });
  };

  handleRegistration = ({ username, password }) => {
    this.toggleLoading();
    AuthApiService.postUser({ username, password })
      .then(() => {
        AuthApiService.postLogin({ username, password }).then((res) => {
          TokenService.saveAuthToken(res.authToken);
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  handleLogin = ({ username, password }) => {
    let authToken = AuthApiService.postLogin({ username, password });
    TokenService.saveAuthToken(authToken);
  };

  processLogin = (authToken) => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.user_id,
      username: jwtPayload.sub
    });
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    this.setUser({});
  };

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      handleRegistration: this.handleRegistration,
      processLogin: this.processLogin,
      processLogout: this.processLogout
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
