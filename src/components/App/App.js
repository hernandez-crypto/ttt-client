import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import TTTOffline from '../../routes/TTTOffline/TTTOffline';
import TTTOnlineForm from '../../routes/TTTOnline/TTTOnlineForm';
import TTTOnlineGame from '../../routes/TTTOnline/TTTOnlineGame';
import './App.css';

class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Header />
        </header>
        <main className="App__main">
          {this.state.hasError && (
            <p className="red">There was an error! Oh no!</p>
          )}
          <Switch>
            <PublicOnlyRoute path={'/login'} component={LoginPage} />
            <PublicOnlyRoute path={'/register'} component={RegistrationPage} />
            <Route exact path={'/'} component={TTTOffline} />
            <PrivateRoute exact path={'/online'} component={TTTOnlineForm} />
            <PrivateRoute
              path={'/online/:room_name'}
              component={TTTOnlineGame}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
