import React, { Component } from 'react';
import Square from '../Square/Square';
import './Board.css';

export default class Board extends Component {
  render() {
    let { board, setChoice } = this.props;
    console.log(board);
    let boxes = board.map((square, i) => (
      <Square
        setChoice={setChoice}
        id={`${i}`}
        key={`${i}`}
        currentValue={square}
      />
    ));

    return (
      <>
        <div className="container">{boxes}</div>
      </>
    );
  }
}
