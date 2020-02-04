import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landingPage">
        <div>
          <p>Tic-Tac-Toe App featuring :</p>
          <ul>
            <li>Web Multiplayer</li>
            <li>Local Multiplayer</li>
            <li>Unbeatable AI that uses minimax algorithm</li>
            <li>Beatable bots to restore confidence</li>
          </ul>
          <p>
            A sample account is also available. Username: 'demo' Password:
            'password'
          </p>
        </div>
        <div className="playOptions">
          <div className="landingLinks">
            <h2>
              <Link to="/offline">Offline</Link>
            </h2>

            <h2>
              <Link to="/online">Online</Link>
            </h2>
          </div>
          <p style={{ textAlign: 'center' }}>
            Select Offline or Online to Play !
          </p>
        </div>
      </div>
    );
  }
}
