import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';

const UserContext = React.createContext({
  user: {},
  error: null,
  loading: false,
  setLoading: () => {},
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
    const state = { user: {}, error: null, loading: false };

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

  toggleLoading = () => {
    this.setState((state) => ({ loading: !state.loading }));
  };

  handleLogin = ({ username, password }) => {
    AuthApiService.postLogin({ username, password }).then((res) => {
      TokenService.saveAuthToken(res.authToken);
    });
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
      loading: this.state.loading,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      toggleLoading: this.toggleLoading,
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
