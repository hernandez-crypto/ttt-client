import React, { Component } from 'react';
import Square from '../Square/Square';
import './Board.css';

export default class Board extends Component {
  render() {
    let boxes = this.props.board.map((square, i) => (
      <Square
        setChoice={this.props.setChoice}
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
