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

  for (let i = 0; i < board.length; i++) {
    if (typeof board[i] === 'number') return null;
  }
  return 'tie';
}

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

  mediumMode = (board) => {
    let nums = 0;
    board.forEach((square, index) => {
      if (typeof square === 'number') nums += 1;
    });
    if (nums % 2 === 0) this.hardMode(board);
    this.easyMode(board);
  };

  hardMode = (board) => {
    let bestScore = -Infinity;
    let move;
    board.forEach((square, index) => {
      if (typeof square === 'number') {
        /// <== checks if a spot is open
        board[index] = 'O';
        let score = this.miniMax(board, false, 0, false);
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
      if (result === 'X') return -10 + depth;
      else if (result === 'O') return 10 - depth;
      else if (result === 'tie') return 0;
    }

    if (maximizing) {
      let bestScore = -Infinity;
      board.forEach((square, index) => {
        if (typeof square === 'number') {
          board[index] = 'O';
          let score = this.miniMax(board, false, depth + 1);
          board[index] = index;
          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    }
    if (!maximizing) {
      let bestScore = Infinity;
      board.forEach((square, index) => {
        if (typeof square === 'number') {
          board[index] = 'X';
          let score = this.miniMax(board, true, depth + 1);
          board[index] = index;
          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  };
}
/// Michael Kirsch helped me develop this algorithm
/// He is the algorithm wizard, here's his linkedIn : https://www.linkedin.com/in/michael-kirsch-40a9a2194/
