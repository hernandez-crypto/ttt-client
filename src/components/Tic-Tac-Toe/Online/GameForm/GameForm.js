import React, { Component } from 'react';
import BoardApiService from '../../../../services/board-api-service';
import { Button, TextInput } from '../../../Utils/Utils';
import './GameForm.css';

export default class JoinGameForm extends Component {
  static defaultProps = {
    onJoinSuccess: () => {}
  };

  state = {
    error: null
  };

  handleJoinSubmit = (ev) => {
    ev.preventDefault();
    const { game_room } = ev.target;
    this.setState({ error: null });
    BoardApiService.postSecondPlayer(game_room.value)
      .then(() => {
        this.props.toggleLoading();
        this.props.onJoinSuccess(game_room.value);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  createNewGame = () => {
    let { toggleLoading, onJoinSuccess } = this.props;
    let roomName = Math.random()
      .toString(36)
      .substring(2, 15);
    BoardApiService.createNewBoard(roomName).then((res) => {
      toggleLoading();
      BoardApiService.getCurrentBoard(res.game.game_room)
        .then(() => {
          onJoinSuccess(res.game.game_room);
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="GameFormContainer">
        <div className="CreateNewGameRoom_div">
          <label htmlFor="CreateNewGameRoom">Create New Game</label>
          <Button id="CreateNewGameRoom" onClick={() => this.createNewGame()}>
            Create
          </Button>
        </div>

        <form className="JoinGameForm" onSubmit={this.handleJoinSubmit}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div>
            <TextInput
              props={{
                label: 'Join Game',
                name: 'game_room',
                type: 'text',
                placeholder: 'ex. fasd7as78d',
                fullWidth: true,
                required: true,
                id: 'JoinGameForm__game_room'
              }}
            />
          </div>
          <Button type="submit">Join</Button>
        </form>
      </div>
    );
  }
}
