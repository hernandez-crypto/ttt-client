import config from '../config';

const TokenService = {
  saveLoginInfo(token, name, id) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
    window.localStorage.setItem(config.USER_ID, id);
    window.localStorage.setItem(config.USER_NAME, name);
  },
  getAuthName() {
    return window.localStorage.getItem(config.USER_NAME);
  },
  getAuthId() {
    return window.localStorage.getItem(config.USER_ID);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
    window.localStorage.removeItem(config.USER_ID);
    window.localStorage.removeItem(config.USER_NAME);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  }
};

export default TokenService;
