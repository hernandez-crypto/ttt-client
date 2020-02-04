import React, { Component } from 'react';
//import BoardApiServive from '../services/board-api-service';

const GameContext = React.createContext({
  game: {},
  error: null,
  currentTurn: false,
  board: '000000000',
  otherPlayer: {},
  setError: () => {},
  createNewGame: () => {},
  patchNewMove: () => {},
  postSecondPlayer: () => {},
  findIfNewRound: () => {}
});

export default GameContext;

export class GameProvider extends Component {
  constructor(props) {
    super(props);
    const state = { game: {}, error: null };
    this.state = state;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  createNewGame = () => {};

  updateCurrentGame = () => {};

  patchNewMove = () => {};

  postSecondPlayer = () => {};

  findIfNewRound = () => {};

  render() {
    const value = {
      game: this.state.game,
      error: this.state.error,
      setError: this.setError,
      createNewGame: this.createNewGame,
      patchNewMove: this.patchNewMove,
      postSecondPlayer: this.postSecondPlayer,
      findIfNewRound: this.findIfNewRound
    };
    return (
      <GameContext.Provider value={value}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}
