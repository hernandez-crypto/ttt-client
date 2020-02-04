import React from 'react';
import './Legend.css';

export default function Legend(props) {
  let { playerOne, playerTwo, currentPlayer, roomName, round } = props;
  return (
    <>
      <h2 className="legend One">
        Turn :{' '}
        {currentPlayer === playerOne.id ? playerOne.name : playerTwo.name}
      </h2>
      <div className="stats">
        <h2 className="legend Two">
          {playerOne.name} : {playerOne.score}
        </h2>
        <h2 className="legend Three">
          {playerOne.score === playerTwo.score
            ? '='
            : playerOne.score > playerTwo.score
            ? '>'
            : '<'}
        </h2>
        <h2 className="legend Four">
          {typeof playerTwo.name === 'object'
            ? 'P2 Has Not Joined'
            : `${playerTwo.name} : ${playerTwo.score}`}
        </h2>
      </div>
      <h2 className="legend Five">Round : {round} </h2>
      <h3 className="legend Six">Room Name : {roomName} </h3>
    </>
  );
}
