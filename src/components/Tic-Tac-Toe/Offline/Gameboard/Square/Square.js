import React, { Component } from 'react';
import './Square.css';

export default class Square extends Component {
  handleClick = () => {
    let { id, setChoice } = this.props;
    setChoice(id);
  };

  render() {
    const { id, currentValue } = this.props;
    let value = typeof currentValue === 'number' ? '' : currentValue;
    return (
      <div id={id} className="box" onClick={this.handleClick}>
        {value}
      </div>
    );
  }
}
