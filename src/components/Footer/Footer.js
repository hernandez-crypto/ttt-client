import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer__content">
        <p>Julio C. Hernandez 2019</p>
        <button className="toggleTheme" onClick={this.props.toggleTheme}>
          Toggle Theme
        </button>
      </div>
    );
  }
}
