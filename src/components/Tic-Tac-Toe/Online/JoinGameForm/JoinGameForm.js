import React, { Component } from 'react';
import BoardApiService from '../../../../services/board-api-service';
import { Button, Input, Required } from '../../../Utils/Utils';
import './JoinGameForm.css';

export default class JoinGameForm extends Component {
  static defaultProps = {
    onJoinSuccess: () => {},
  };

  state = {
    error: null,
  };

  handleJoinSubmit = ev => {
    ev.preventDefault();
    const { game_room } = ev.target;
    this.setState({ error: null });
    BoardApiService.postSecondPlayer(game_room.value)
      .then(() => {
        this.props.onJoinSuccess(game_room.value);
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };
  createNewGame = () => {
    let roomName = Math.random()
      .toString(36)
      .substring(2, 15);
    BoardApiService.createNewBoard(roomName).then(res => {
      BoardApiService.getCurrentBoard(res.board.game_room)
        .then(() => {
          this.props.onJoinSuccess(res.board.game_room);
        })
        .catch(res => {
          this.setState({ error: res.error });
        });
    });
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <Button onClick={() => this.createNewGame()}>Create</Button>
        <form className="JoinGameForm" onSubmit={this.handleJoinSubmit}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="JoinGameFormInputs">
            <label htmlFor="JoinGameForm__game_room">
              Insert Game Room <Required />
            </label>
            <Input
              name="game_room"
              type="text"
              required
              id="JoinGameForm__game_room"
            ></Input>
          </div>
          <Button type="submit">Join</Button>
        </form>
      </>
    );
  }
}
