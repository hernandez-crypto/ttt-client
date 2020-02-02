import React, { Component } from 'react';
import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landingPage">
        <p>
          This app is a basic tic tac toe game that features :
          <ul>
            <li>Web Multiplayer</li>
            <li>Local Multiplayer</li>
            <li>Unbeatable AI that uses minimax algorithm</li>
            <li>Beatable bots to restore confidence</li>
          </ul>
        </p>
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
        <h3>
          Press the Tic-Tac-Toe header to play offline or the login / register
          to play online !
        </h3>
        <h3>
          <a href="/offline">Offline</a>
        </h3>
      </div>
    );
  }
}
