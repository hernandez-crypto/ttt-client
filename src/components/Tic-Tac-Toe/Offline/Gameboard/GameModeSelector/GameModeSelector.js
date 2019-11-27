import React, { Component } from 'react';
import './GameModeSelector.css';

export default class GameModeSelector extends Component {
  render() {
    return (
      <div className="typeSelect">
        <label>Select Game Mode</label>
        <select
          value={this.props.Computer}
          onChange={this.props.selectBotDifficulty}
        >
          <option value="" selected disabled hidden>
            Select GameMode
          </option>
          <option value="0">Local 1v1</option>
          <option value="1">Easy - Working</option>
          <option value="2">Medium - Under Construction</option>
          <option value="3">Hard - Under Construction</option>
        </select>
      </div>
    );
  }
}
