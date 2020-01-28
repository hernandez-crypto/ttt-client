function checkWinner(board) {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];
  for (let i = 0; i < winCombos.length; i++) {
    let [a, b, c] = winCombos[i];
    if (board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  let isFull = false;
  for (let i = 0; i < board.length; i++) {
    if (typeof board[i] === 'string') isFull = true;
    if (typeof board[i] === 'number') isFull = false;
  }
  if (isFull) return 'tie';
  else return null;
}

let scores = {
  O: 1,
  X: -1,
  tie: 0
};

export default class ComputerPlayer {
  constructor(setChoice) {
    this.setChoice = setChoice;
  }

  makeMove = (difficulty, board) => {
    switch (difficulty) {
      case 1:
        return this.easyMode(board);
      case 2:
        return this.mediumMode(board);
      case 3:
        return this.hardMode(board);
      default:
        this.easyMode(board);
    }
  };

  easyMode = (board) => {
    let options = [];
    board.forEach((square, index) => {
      if (typeof square === 'number') {
        options = [...options, index];
        return;
      }
    });
    let choice = options[Math.floor(Math.random() * options.length)];
    this.setChoice(choice);
  };

  mediumMode = () => {};

  hardMode = (board) => {
    let bestScore = -Infinity;
    let move;
    board.forEach((square, index) => {
      if (typeof square === 'number') {
        board[index] = 'O';
        let score = this.minimax(board, false, 0);
        board[index] = index;
        if (score > bestScore) {
          bestScore = score;
          move = index;
        }
      }
    });
    this.setChoice(move);
  };

  miniMax = (board, maximizing, depth) => {
    let result = checkWinner(board);
    if (result !== null) {
      let score = scores[result];
      return score;
    }
    if (maximizing) {
      let bestScore = -Infinity;
      board.forEach((square, index) => {
        if (typeof square === 'number') {
          board[index] = 'O';
          let score = this.minimax(board, false, depth + 1);
          board[index] = index;
          bestScore = Math.max(bestScore, score);
        }
      });
      return bestScore;
    }
    if (!maximizing) {
      let bestScore = Infinity;
      board.forEach((square, index) => {
        if (typeof square === 'number') {
          board[index] = 'X';
          let score = this.minimax(board, true, depth + 1);
          board[index] = index;
          bestScore = Math.min(bestScore, score);
        }
      });
      return bestScore;
    }
  };
}
