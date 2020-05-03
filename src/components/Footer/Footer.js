import React, { Component } from 'react';
import { Switch } from '@material-ui/core';
import './Footer.css';

export default class Footer extends Component {
  state = { mode: true };
  setMode = () => {
    this.setState((state) => ({ mode: !state.mode }));
    this.props.toggleTheme();
  };
  render() {
    return (
      <div className="footer__content">
        <label htmlFor="themeToggle">Theme</label>
        <Switch
          name="themeToggle"
          color="primary"
          checked={this.state.mode}
          onChange={() => this.setMode()}
        />
      </div>
    );
  }
}
