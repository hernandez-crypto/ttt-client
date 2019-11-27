import React from 'react';
import './Legend.css';

export default function Legend(props) {
  let { playerOne, playerTwo, currentPlayer, roomName } = props;
  return (
    <>
      <h2 className="legend One">
        {currentPlayer === 1 ? playerTwo.name : playerOne.name}
      </h2>
      <div className="stats">
        <h2 className="legend Two">
          {playerOne.name === '' ? 'P1' : playerOne.name} : {playerOne.score}
        </h2>
        <h2 className="legend Three">
          {playerTwo.name === '' ? 'P2' : playerTwo.name} : {playerTwo.score}
        </h2>
      </div>
      <h4 className="legend Four">Room : </h4>
      {roomName}
    </>
  );
}
