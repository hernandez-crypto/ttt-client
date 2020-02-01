import React, { Component } from 'react';
import Board from './Gameboard/Board/Board';
import Legend from './Gameboard/Legend/Legend';
import './Tic-Tac-Toe.css';
import BoardApiService from '../../../../services/board-api-service';
import TokenService from '../../../../services/token-service';

export default class TicTacToe extends Component {
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
      id: parseInt(TokenService.getAuthId()),
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
          name: res.player_one_usrname,
          id: res.player_one_id,
          score: res.player_one_score
        },
        playerTwo: {
          name: res.player_two_usrname,
          id: res.player_two_id,
          score: res.player_two_score
        },
        client_user: {
          ...this.state.client_user,
          symbol: this.state.client_user.id === res.player_one_id ? 'X' : 'O'
        },
        roundStarted: false,
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
    this.makeFetchCallAndUpdate();
    if (this.state.playerTwo.name === 'undefined') return;
    let {
      currentPlayer,
      client_user,
      board,
      playerOne,
      playerTwo
    } = this.state;
    if (
      currentPlayer === client_user.id &&
      parseInt(board[squareNumber]) === 0 &&
      playerTwo.id !== null
    ) {
      let otherUserId =
        client_user.id === playerOne.id ? playerTwo.id : playerOne.id;
      board[squareNumber] = client_user.symbol;
      BoardApiService.patchNewMove(
        this.props.roomName,
        board,
        otherUserId
      ).then((res) => {
        this.setState({
          board: res.board,
          currentPlayer: res.current_player
        });
      });
    } else this.setState({ error: 'Slow Down Buster' });
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
