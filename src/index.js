import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { GameProvider } from './contexts/GameContext';
import * as serviceWorker from './serviceWorker';
import App from './components/App/App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
