import TokenService from './token-service';
import config from '../config';

const BoardApiService = {
  createNewBoard(game_room) {
    return fetch(`${config.API_ENDPOINT}/games`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ game_room })
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postSecondPlayer(game_room) {
    return fetch(`${config.API_ENDPOINT}/games/${game_room}`, {
      method: 'POST',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getCurrentBoard(game_room) {
    return fetch(`${config.API_ENDPOINT}/games/${game_room}`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((res) => {
        res.board = res.board.split('');
        return res;
      });
  },
  patchNewMove(game_room, index, symbol) {
    return fetch(`${config.API_ENDPOINT}/games/${game_room}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ index, symbol })
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((res) => {
        res.board = res.board.split('');
        return res;
      });
  }
};

export default BoardApiService;
