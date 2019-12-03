import React, { Component } from 'react';
import './GameModeSelector.css';

export default class GameModeSelector extends Component {
  render() {
    return (
      <>
        <div className="typeSelect">
          <label>
            <h4>Select Game Mode</h4>
          </label>
          <select
            value={this.props.Computer}
            onChange={this.props.selectBotDifficulty}
          >
            <option value="none">Select GameMode</option>
            <option value="0">Local 1v1</option>
            <option value="1">Easy - Working</option>
            <option value="2">Medium - Under Construction</option>
            <option value="3">Hard - Under Construction</option>
          </select>
        </div>
      </>
    );
  }
}
