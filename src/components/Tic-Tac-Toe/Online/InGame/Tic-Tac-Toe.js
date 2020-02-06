import React, { Component } from 'react';
import Board from './Gameboard/Board/Board';
import Legend from './Gameboard/Legend/Legend';
import './Tic-Tac-Toe.css';
import BoardApiService from '../../../../services/board-api-service';

export default class TicTacToe extends Component {
  static defaultProps = {
    playerId: ''
  };

  state = {
    playerOne: {
      id: '',
      score: 0,
      name: ''
    },
    playerTwo: {
      id: '',
      score: 0,
      name: ''
    },
    client_user: {
      id: this.props.playerId,
      symbol: ''
    },
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    round: 0,
    currentPlayer: 1
  };

  makeFetchCallAndUpdate = () => {
    BoardApiService.getCurrentBoard(this.props.roomName).then((res) => {
      this.setState({
        board: res.board,
        playerOne: {
          name: res.player_one_username,
          id: res.player_one_id,
          score: res.player_one_score
        },
        playerTwo: {
          name: res.player_two_username,
          id: res.player_two_id,
          score: res.player_two_score
        },
        client_user: {
          ...this.state.client_user,
          symbol: this.state.client_user.id === res.player_one_id ? 'X' : 'O'
        },
        currentPlayer: res.current_player,
        round: res.round
      });
    });
  };

  componentWillMount() {
    this.makeFetchCallAndUpdate();
  }

  async componentDidMount() {
    try {
      this.updateGame = setInterval(async () => {
        this.makeFetchCallAndUpdate();
        this.setState({
          error: ''
        });
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateGame);
  }

  setChoice = (squareNumber) => {
    let { currentPlayer, client_user, playerTwo, board } = this.state;
    if (playerTwo.name == null) {
      this.setState({
        error: 'P2 has not yet joined, Please make sure to share the Room Name.'
      });
      return;
    }
    if (board[squareNumber] === '0' || board[squareNumber] === 0) {
      if (currentPlayer === client_user.id) {
        BoardApiService.patchNewMove(
          this.props.roomName,
          squareNumber,
          client_user.symbol
        ).then((res) => {
          this.setState({
            board: res.board,
            currentPlayer: res.current_player
          });
        });
      } else this.setState({ error: `It's not your turn yet :(` });
    } else this.setState({ error: `That spot has been taken :(` });
  };

  render() {
    let {
      playerOne,
      playerTwo,
      currentPlayer,
      board,
      error,
      round
    } = this.state;
    return (
      <div className="tic-tac-toe-board">
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <Board
          setChoice={this.setChoice}
          currentPlayer={currentPlayer}
          board={board}
        />
        <Legend
          currentPlayer={currentPlayer}
          playerOne={playerOne}
          playerTwo={playerTwo}
          roomName={this.props.roomName}
          round={round}
        />
      </div>
    );
  }
}
