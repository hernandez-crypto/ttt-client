import React from 'react';
import './Legend.css';

export default function Legend(props) {
  let { currentPlayer, playerOne, playerTwo, round } = props;
  return (
    <>
      <h2 className="legend One">Turn : P{currentPlayer}</h2>
      <div className="stats">
        <h2 className="legend Two">P1 : {playerOne}</h2>
        <h2 className="legend Three">
          {playerOne === playerTwo ? '=' : playerOne > playerTwo ? '>' : '<'}
        </h2>
        <h2 className="legend Four">P2 : {playerTwo}</h2>
      </div>
      <h2 className="legend">Round : {round}</h2>
    </>
  );
}
