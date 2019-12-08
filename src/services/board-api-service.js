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
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(res => {
        res.board = res.board.split('');
        return res;
      });
  },
  patchNewMove(game_room, updatedBoard, next_player_id) {
    return fetch(`${config.API_ENDPOINT}/games/${game_room}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        board: updatedBoard.join(''),
        next_player: next_player_id,
      }),
    })
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(res => {
        res.board = res.board.split('');
        return res;
      });
  },
  findIfNewRound(NewBoard, currentBoard) {
    if (JSON.stringify(NewBoard) !== JSON.stringify(currentBoard)) {
      let filteredArray = NewBoard.filter(square => square === '0');
      if (filteredArray.length === 8 || filteredArray.length === 0) {
        return true;
      }
      return;
    } else return false;
  },
};

export default BoardApiService;
