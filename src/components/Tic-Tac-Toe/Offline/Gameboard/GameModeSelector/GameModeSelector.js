import React, { Component } from 'react';
import { NativeSelect } from '@material-ui/core';
import './GameModeSelector.css';

export default class GameModeSelector extends Component {
  render() {
    return (
      <div className="typeSelect">
        <label>
          <h4>Select Game Mode</h4>
        </label>
        <NativeSelect
          value={this.props.Computer}
          onChange={this.props.selectBotDifficulty}>
          <option value="none">Select GameMode</option>
          <option value={0}>Local 1v1</option>
          <option value={1}>Easy</option>
          <option value={2}>Medium</option>
          <option value={3}>Hard</option>
        </NativeSelect>
      </div>
    );
  }
}
