import React from 'react';
import './Legend.css';

export default function Legend(props) {
  return (
    <>
      <h2 className="legend One">Turn : P{props.currentPlayer}</h2>
      <div className="stats">
        <h2 className="legend Two">P1 : {props.playerOne}</h2>
        <h2 className="legend Three">
          {props.playerOne === props.playerTwo
            ? '='
            : props.playerOne > props.playerTwo
            ? '>'
            : '<'}
        </h2>
        <h2 className="legend Four">P2 : {props.playerTwo}</h2>
      </div>
      <h2 className="legend">Round : {props.round}</h2>
    </>
  );
}
