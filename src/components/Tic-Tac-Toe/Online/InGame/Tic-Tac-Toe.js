import React, { Component } from 'react';
import Board from './Gameboard/Board/Board';
import Legend from './Gameboard/Legend/Legend';
//import { Button } from '../../../Utils/Utils';
import './Tic-Tac-Toe.css';
import BoardApiService from '../../../../services/board-api-service';
import TokenService from '../../../../services/token-service';

export default class TicTacToe extends Component {
  state = {
    playerOne: {
      id: '',
      moves: [],
      score: 0,
      name: '',
    },
    playerTwo: {
      id: '',
      moves: [],
      score: 0,
      name: '',
    },
    client_user: {
      id: parseInt(TokenService.getAuthId()),
      symbol: '',
    },
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentPlayer: 1,
    count: 0,
  };

  makeFetchCall = () => {
    BoardApiService.getCurrentBoard(this.props.roomName).then(res => {
      this.setState({
        board: res.board.split(''),
        playerOne: {
          ...this.state.playerOne,
          name: res.player_started_usrname,
          id: res.player_started_id,
        },
        playerTwo: {
          ...this.state.playerTwo,
          name: res.player_joined_usrname,
          id: res.player_joined_id,
        },
        client_user: {
          ...this.state.client_user,
          symbol:
            this.state.client_user.id === res.player_started_id ? 'X' : 'O',
        },
        currentPlayer: res.current_player,
        error: '',
      });
    });
  };

  componentWillMount() {
    this.makeFetchCall();
  }

  async componentDidMount() {
    try {
      this.intervalId = setInterval(async () => {
        this.makeFetchCall();
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  setChoice = squareNumber => {
    let {
      currentPlayer,
      client_user,
      board,
      playerOne,
      playerTwo,
    } = this.state;
    if (
      currentPlayer === client_user.id &&
      parseInt(board[squareNumber]) === 0 &&
      playerTwo.id !== null
    ) {
      let otherUserId =
        client_user.id === playerOne.id ? playerTwo.id : playerOne.id;
      const gameRoom = this.props.roomName;
      let updatedBoard = [...board];
      updatedBoard[squareNumber] = client_user.symbol;
      BoardApiService.patchNewMove(gameRoom, updatedBoard, otherUserId).then(
        res => {
          this.setState({
            board: res.board,
            currentPlayer: res.current_player,
          });
        }
      );
    } else this.setState({ error: 'No sir' });
  };

  render() {
    let { playerOne, playerTwo, currentPlayer, board, error } = this.state;
    console.log(this.state);
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
        />
      </div>
    );
  }
}
