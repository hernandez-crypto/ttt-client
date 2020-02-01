import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import TTTOffline from '../../routes/TTTOffline/TTTOffline';
import TTTOnlineForm from '../../routes/TTTOnline/TTTOnlineForm';
import TTTOnlineGame from '../../routes/TTTOnline/TTTOnlineGame';
import LandingPage from '../LandingPage/LandingPage';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme/theme';
import { GlobalStyles } from '../Theme/global';
import { PacmanLoader } from 'react-spinners';
import { css } from '@emotion/core';
import './App.css';

class App extends Component {
  state = { theme: 'dark', hasError: false, loading: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  pacManStyles = () => {
    return css`
      display: block;
      margin: auto auto;
      alignself: center;
    `;
  };

  toggleTheme = () => {
    this.setState((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light'
    }));
  };

  toggleLoading = () => {
    this.setState((state) => ({
      loading: !state.loading
    }));
  };

  render() {
    let { theme, hasError, loading } = this.state;

    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <div className="App">
          <header className="App__header">
            <Header />
          </header>

          {loading === true ? (
            <div className="spinnerContainer">
              <PacmanLoader
                css={this.pacManStyles()}
                size={50}
                color={this.state.theme === 'dark' ? '#E2E2E2' : '#363537'}
              />
            </div>
          ) : (
            <main className="App__main">
              {hasError && <p className="red">There was an error! Oh no!</p>}
              <Switch>
                <Route exact path={'/'} component={LandingPage} />
                <PublicOnlyRoute
                  path={'/login'}
                  render={(props) => (
                    <LoginPage {...props} loadToggle={this.toggleLoading} />
                  )}
                />
                <PublicOnlyRoute
                  path={'/register'}
                  props={{ loadToggle: this.toggleLoading }}
                  component={RegistrationPage}
                />
                <Route exact path={'/offline'} component={TTTOffline} />
                <PrivateRoute
                  exact
                  path={'/online'}
                  component={TTTOnlineForm}
                />
                <PrivateRoute
                  path={'/online/:room_name'}
                  component={TTTOnlineGame}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </main>
          )}

          <footer className="App__footer">
            <Footer toggleTheme={this.toggleTheme} />
          </footer>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
