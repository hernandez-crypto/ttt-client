import TicTacToeForm from '../../components/Tic-Tac-Toe/Online/JoinGameForm/JoinGameForm';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../components/Utils/Utils';

export default class TTTOnlineForm extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  onJoinSuccess = gameRoom => {
    const { history } = this.props;
    history.push(`/online/${gameRoom}`);
  };
  render() {
    return (
      <div>
        <Section className="TTTPage">
          <Link to="/">
            <h3>Play Offline</h3>
          </Link>
          <p>Play with a friend!</p>
          <TicTacToeForm onJoinSuccess={this.onJoinSuccess} />
        </Section>
      </div>
    );
  }
}
