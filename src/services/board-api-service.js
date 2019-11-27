import TokenService from './token-service';
import config from '../config';

const BoardApiService = {
  createNewBoard(game_room) {
    return fetch(`${config.API_ENDPOINT}/games`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ game_room }),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postSecondPlayer(game_room) {
    return fetch(`${config.API_ENDPOINT}/games/${game_room}`, {
      method: 'POST',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getCurrentBoard(game_room) {
    return fetch(`${config.API_ENDPOINT}/games/${game_room}`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  patchNewMove(game_room, updatedBoard, next_player_id) {
    return fetch(`${config.API_ENDPOINT}/games/${game_room}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        board: this.boardArrayToString(updatedBoard),
        next_player: next_player_id,
      }),
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(res => {
        if (typeof res.board === 'string') {
          res.board = res.board.split('');
        }
        return res;
      });
  },
  boardStringToArray(board) {
    let newArr = [];
    for (let i = 0; i < 9; i++) {
      newArr.push(parseInt(board.charAt(i)) || 0);
    }
    return newArr;
  },
  boardArrayToString(board) {
    return board.join('');
  },
};

export default BoardApiService;
