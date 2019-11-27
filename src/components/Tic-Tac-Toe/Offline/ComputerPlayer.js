function isFull(board) {
  let openSquare = board.find(item => typeof item === 'number');
  if (!openSquare) {
    return true;
  }
  return false;
}
function isEmpty(board) {
  let openSquare = board.find(item => typeof item === 'number');
  if (openSquare) {
    return true;
  }
  return false;
}
function insertNewMove(board, symbol, index) {
  if (index > 8 || typeof board[index] === 'string') return false;
  board[index] = symbol;
  return true;
}
function getAvailableMoves(board) {
  const moves = [];
  board.forEach((square, index) => {
    if (typeof square === 'number') moves.push(index);
  });
  return moves;
}

function checkWin(board, symbol) {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  let winStats = { winner: '', combo: [] };
  winCombos.forEach(item => {
    let [a, b, c] = item;
    if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
      winStats = { winner: symbol, combo: [a, b, c] };
    }
  });
  return winStats;
}

export default class ComputerPlayer {
  constructor(setChoice, max_depth = -1) {
    this.setChoice = setChoice;
    this.max_depth = max_depth;
    this.nodes_map = new Map();
  }

  makeMove = (difficulty, board, maximizing) => {
    switch (difficulty) {
      case 1:
        return this.easyMode(board);
      case 2:
        return this.mediumMode(board);
      case 3:
        this.setChoice(this.hardMode(board, maximizing, 0));
        return;
      default:
        this.easyMode(board);
    }
  };
  easyMode = board => {
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

  mediumMode = () => {
    // computer bot that chooses from the available spots on the board randomly & with the hard algorithm
  };

  hardMode = (board, maximizing, depth) => {
    if (depth === 0) this.nodes_map.clear();
    let symbol = 'X';

    if (checkWin(board, symbol).winner === symbol || depth === this.max_depth) {
      if (checkWin(board, symbol).winner === symbol) {
        return 100 - depth;
      } else if (checkWin(board, 'O').winner === 'O') {
        return -100 + depth;
      }
      return 0;
    }

    if (maximizing) {
      let best = -100;
      getAvailableMoves(board).forEach(index => {
        let boardCopy = [...board];
        boardCopy[index] = 'O';
        let node_value = this.hardMode(boardCopy, false, depth + 1);
        best = Math.max(best, node_value);
        if (depth === 0) {
          let moves = this.nodes_map.has(node_value)
            ? `${this.nodes_map.get(node_value)},${index}`
            : index;
          this.nodes_map.set(node_value, moves);
        }
      });
      if (depth === 0) {
        let arr;
        let rand;
        let ret;
        if (typeof this.nodes_map.get(best) === 'string') {
          arr = this.nodes_map.get(best).split(',');
          rand = Math.floor(Math.random() * arr.length);
          ret = arr[rand];
        } else {
          ret = this.nodes_map.get(best);
        }
        return ret;
      }
      return best;
    }
    if (!maximizing) {
      let best = -100;
      getAvailableMoves(board).forEach(index => {
        let boardCopy = [...board];
        boardCopy[index] = 'X';
        let node_value = this.hardMode(boardCopy, true, depth + 1);
        best = Math.min(best, node_value);
        if (depth === 0) {
          let moves = this.nodes_map.has(node_value)
            ? `${this.nodes_map.get(node_value)},${index}`
            : index;
          this.nodes_map.set(node_value, moves);
        }
      });
      if (depth === 0) {
        let arr;
        let rand;
        let ret;
        if (typeof this.nodes_map.get(best) == 'string') {
          arr = this.nodes_map.get(best).split(',');
          rand = Math.floor(Math.random() * arr.length);
          ret = arr[rand];
        } else {
          ret = this.nodes_map.get(best);
        }
        return ret;
      }
      return best;
    }
  };
}
