import TicTacToeGame from '../../components/Tic-Tac-Toe/Online/InGame/Tic-Tac-Toe';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../components/Utils/Utils';
import TokenService from '../../services/token-service';

export default class TTTOnlineGame extends Component {
  render() {
    return (
      <div>
        <Section className="gameRoom">
          <Link to="/offline">
            <h3>Play Offline</h3>
          </Link>
          <TicTacToeGame
            roomName={this.props.match.params.room_name}
            playerId={parseInt(TokenService.parseAuthToken().user_id)}
          />
        </Section>
      </div>
    );
  }
}
