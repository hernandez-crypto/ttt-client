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
import { lightTheme, darkTheme } from '../Utils//Theme/theme';
import { GlobalStyles } from '../Utils/Theme/global';
import { ClimbingBoxLoader } from 'react-spinners';
import { css } from '@emotion/core';
import './App.css';

class App extends Component {
  state = { theme: 'dark', hasError: false, loading: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  loaderStyles = () => {
    return css`
      display: block;
      margin: auto auto;
      alignself: center;
    `;
  };

  toggleTheme = () => {
    this.setState((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  toggleLoading = () => {
    this.setState((state) => ({ loading: !state.loading }));
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
              <ClimbingBoxLoader
                css={this.loaderStyles()}
                size={50}
                color={this.state.theme === 'dark' ? '#E2E2E2' : '#363537'}
              />
            </div>
          ) : (
            <main className="App__main">
              {hasError && <p className="red">There was an error! Oh no!</p>}

              <Switch>
                <Route exact path={'/'} component={LandingPage} />
                <Route exact path={'/offline'} component={TTTOffline} />
                <PublicOnlyRoute
                  path={'/login'}
                  props={{ toggleLoading: this.toggleLoading }}
                  component={LoginPage}
                />
                <PublicOnlyRoute
                  path={'/register'}
                  props={{ toggleLoading: this.toggleLoading }}
                  component={RegistrationPage}
                />
                <PrivateRoute
                  exact
                  path={'/online'}
                  props={{ toggleLoading: this.toggleLoading }}
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
