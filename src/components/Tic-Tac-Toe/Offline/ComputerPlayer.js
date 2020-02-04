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
      // check if one of the winning combos has equal values
      return board[a];
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (typeof board[i] === 'number') return null; // return null if the board is not full
  }
  return 'tie'; // return tie if the board is full and there are no winners
}

export default class ComputerPlayer {
  constructor(setChoice) {
    this.setChoice = setChoice;
  }

  makeMove = (difficulty, board) => {
    switch (parseInt(difficulty)) {
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
    return this.setChoice(choice);
  };

  mediumMode = (board) => {
    let nums = 0;
    board.forEach((square) => {
      if (typeof square === 'number') nums += 1;
    });
    if (nums % 2 === 0) return this.hardMode(board);
    else return this.easyMode(board);
  };

  hardMode = (board) => {
    let bestScore = -Infinity;
    let move;
    board.forEach((square, index) => {
      if (typeof square === 'number') {
        /// checks if a spot is open
        board[index] = 'O'; /// set an open spot to the computers symbol ( 'O' )
        let score = this.miniMax(board, false, 0); // run the minimax algorithm on the move
        board[index] = index; // reset the spot on the board to be its original value : its index
        if (score > bestScore) {
          // if the outcome of moving on that spot on the board yields a high chance of success; make that move the currentMove and track the score to compare against other spots on the board
          bestScore = score;
          move = index;
        }
      }
    });
    return this.setChoice(move); // make the move on the board
  };

  miniMax = (board, maximizing, depth) => {
    let result = checkWinner(board); // check the status of the current board. results can be either 'O' signalling that 'O' won, 'X' signalling that 'X' won, 'tie' meaning the board is full w/ no winners, or null meaning the game is not complete
    if (result !== null) {
      if (result === 'X') return -10 + depth;
      // if human wins return a negative score
      else if (result === 'O') return 10 - depth;
      // if bot wins return a positive score
      else if (result === 'tie') return 0; // if no one wins return 0
    }

    if (maximizing) {
      // if the current player is 'O'
      let bestScore = -Infinity;
      board.forEach((square, index) => {
        if (typeof square === 'number') {
          // check each open spot on the board
          board[index] = 'O'; // make a move on each spot
          let score = this.miniMax(board, false, depth + 1); // calculate the possible outcome of moving to each spot
          board[index] = index; // reset the spot to its original value
          bestScore = Math.max(score, bestScore); // return the score that yields the higher chance of 'O' winning
        }
      });
      return bestScore; // return the best possible outcome from each spot on the board
    }
    if (!maximizing) {
      // if the currentPlayer is human, 'X'
      let bestScore = Infinity;
      board.forEach((square, index) => {
        if (typeof square === 'number') {
          // check each open spot on the board
          board[index] = 'X'; // make a move on that spot
          let score = this.miniMax(board, true, depth + 1); // caclulate the scores of moving to each possible move on the board
          board[index] = index; // reset the board
          bestScore = Math.min(score, bestScore); // set the bestScore to be the value that minimizes the chances of 'X' winning
        }
      });
      return bestScore; // return the outcome that hs the worst possible outcome out of each spot on the board
    }
  };
}
