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
      name: '',
    },
    playerTwo: {
      id: '',
      score: 0,
      name: '',
    },
    client_user: {
      id: parseInt(TokenService.getAuthId()),
      symbol: '',
    },
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentPlayer: 1,
  };

  makeFetchCall = () => {
    BoardApiService.getCurrentBoard(this.props.roomName).then(res => {
      this.setState({
        board: res.board.split(''),
        playerOne: {
          name: res.player_started_usrname,
          id: res.player_started_id,
          score: res.player_started_score,
        },
        playerTwo: {
          name: res.player_joined_usrname,
          id: res.player_joined_id,
          score: res.player_joined_score,
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
      this.updateGame = setInterval(async () => {
        this.makeFetchCall();
      }, 10000);
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateGame);
  }

  setChoice = squareNumber => {
    this.makeFetchCall();
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
    } else this.setState({ error: 'Please Wait' });
  };

  render() {
    let { playerOne, playerTwo, currentPlayer, board, error } = this.state;
    return (
      <div className="tic-tac-toe-board">
        <Board
          setChoice={this.setChoice}
          currentPlayer={currentPlayer}
          board={board}
        />
        <div role="alert">{error && <p className="red">{error}</p>}</div>
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
