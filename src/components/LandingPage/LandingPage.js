import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landingPage">
        <p>This app is a basic tic tac toe game that features :</p>
        <ul>
          <li>Web Multiplayer</li>
          <li>Local Multiplayer</li>
          <li>Unbeatable AI that uses minimax algorithm</li>
          <li>Beatable bots to restore confidence</li>
        </ul>
        <p>
          To use web multiplayer, both players must be registered. Then player
          one will create a game using the 'Create New Game' button. This will
          generate a special string that the second player will need to paste
          into the 'Join Game Room' input. After that is done, both players then
          continue playing until one gives up !
        </p>
        <p>
          A sample account is also available. Username: 'demo' Password:
          'Password1!'
        </p>
        <p>
          There is also a light / dark mode feature. Simply press the 'Toggle
          Theme' button.
        </p>
        <div className="landingLinks">
          <h2>
            <Link to="/offline">Offline</Link>
          </h2>
          <h2>
            <Link to="/online">Online</Link>
          </h2>
        </div>
      </div>
    );
  }
}
