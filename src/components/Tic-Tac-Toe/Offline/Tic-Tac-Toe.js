import React, { Component } from 'react';
import Board from './Gameboard/Board/Board';
import Legend from './Gameboard/Legend/Legend';
import ComputerPlayer from './ComputerPlayer';
import GameModeSelector from './Gameboard/GameModeSelector/GameModeSelector';
import './Tic-Tac-Toe.css';

export default class TicTacToe extends Component {
  state = {
    playerOne: {
      symbol: 'X',
      moves: [],
      computer: 0,
      score: 0
    },
    playerTwo: {
      symbol: 'O',
      moves: [],
      computer: 3,
      score: 0
    },
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    currentPlayer: 1,
    round: 0,
    count: 0
  };

  componentDidMount() {
    this.computer = new ComputerPlayer(this.setChoice);
  }

  handleEndGame = (winner) => {
    let { playerOne, playerTwo } = this.state;
    if (winner === 1) {
      this.setState({
        playerOne: {
          ...playerOne,
          score: playerOne.score + 1
        },
        count: -1
      });
    }
    if (winner === 2) {
      this.setState({
        playerTwo: {
          ...playerTwo,
          score: playerTwo.score + 1
        },
        count: -1
      });
    } else {
      this.setState({
        count: -1
      });
    }
  };

  restartGame = () => {
    let { playerOne, playerTwo, round } = this.state;
    this.setState({
      playerOne: {
        ...playerOne,
        moves: []
      },
      playerTwo: {
        ...playerTwo,
        moves: []
      },
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      round: round + 1,
      count: 0
    });
    let clearBoxes = Object.values(document.getElementsByClassName('box'));
    clearBoxes.forEach((box) => {
      box.classList.remove('oneWinner');
      box.classList.remove('twoWinner');
    });
  };

  toggleWinnerBoxes = (a, b, c, winner) => {
    let threeRow = [
      document.getElementById(a),
      document.getElementById(b),
      document.getElementById(c)
    ];
    threeRow.forEach((box) => box.classList.add(winner));
  };

  determineWinner = (currentPlayer, squareNumber) => {
    let { playerOne, playerTwo, count } = this.state;
    let { toggleWinnerBoxes, handleEndGame } = this;
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    winCombos.forEach((item) => {
      let [a, b, c] = item;
      let one = [...playerOne.moves, parseInt(squareNumber)];
      let two = [...playerTwo.moves, parseInt(squareNumber)];
      if (currentPlayer === 1) {
        if (one.includes(a) && one.includes(b) && one.includes(c)) {
          toggleWinnerBoxes(a, b, c, 'oneWinner');
          return handleEndGame(currentPlayer);
        }
      } else if (currentPlayer === 2) {
        if (two.includes(a) && two.includes(b) && two.includes(c)) {
          toggleWinnerBoxes(a, b, c, 'twoWinner');
          return handleEndGame(currentPlayer);
        }
      }
      if (count === 8) {
        handleEndGame();
      }
    });
  };

  setChoice = (squareNumber) => {
    let { playerOne, playerTwo, currentPlayer, count, board } = this.state;
    if (count === -1) {
      this.restartGame();
    }
    if (
      board[squareNumber] === playerOne.symbol ||
      board[squareNumber] === playerTwo.symbol ||
      count < 0
    )
      return;
    board[squareNumber] =
      currentPlayer === 1 ? playerOne.symbol : playerTwo.symbol;
    if (currentPlayer === 1) {
      this.setState({
        board,
        playerOne: {
          ...playerOne,
          moves: [...playerOne.moves, parseInt(squareNumber)]
        },
        currentPlayer: 2,
        count: count + 1
      });
    }
    if (currentPlayer === 2) {
      this.setState({
        board,
        playerTwo: {
          ...playerTwo,
          moves: [...playerTwo.moves, parseInt(squareNumber)]
        },
        currentPlayer: 1,
        count: count + 1
      });
    }
    this.determineWinner(currentPlayer, squareNumber);
  };

  componentDidUpdate() {
    let { currentPlayer, playerOne, playerTwo, board } = this.state;
    let player = currentPlayer === 1 ? playerOne : playerTwo;
    if (player.computer > 0) {
      this.computer.makeMove(player.computer, board);
    }
  }

  selectBotDifficulty = (ev) => {
    this.setState({
      playerTwo: {
        ...this.state.playerTwo,
        computer: ev.target.value,
        score: 0
      },
      playerOne: {
        ...this.state.playerOne,
        score: 0
      },
      count: 0,
      round: 0,
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      currentPlayer: 1
    });
  };

  render() {
    let { currentPlayer, board, playerOne, playerTwo, round } = this.state;
    return (
      <>
        <div className="tic-tac-toe-board">
          <Board
            setChoice={this.setChoice}
            currentPlayer={currentPlayer}
            board={board}
          />
          <Legend
            currentPlayer={currentPlayer}
            playerOne={playerOne.score}
            playerTwo={playerTwo.score}
            round={round}
          />
          <GameModeSelector
            selectBotDifficulty={this.selectBotDifficulty}
            Computer={playerTwo.computer}
          />
        </div>
      </>
    );
  }
}
