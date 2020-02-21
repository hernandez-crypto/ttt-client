import React, { Component } from 'react';
import { Switch } from '@material-ui/core';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer__content">
        <label htmlFor="themeToggle">Theme</label>
        <Switch
          name="themeToggle"
          color="primary"
          onChange={this.props.toggleTheme}
        />
      </div>
    );
  }
}
