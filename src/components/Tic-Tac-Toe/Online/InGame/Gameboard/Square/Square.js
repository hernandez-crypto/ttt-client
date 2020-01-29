import React, { Component } from 'react';
import './Square.css';

export default class Square extends Component {
  /// keeping the board components seperate is important to me because I might want to add features to the online component.
  handleClick = () => {
    let { id, setChoice } = this.props;
    setChoice(id);
  };

  render() {
    const { id, currentValue } = this.props;
    let value =
      typeof currentValue === 'number' || currentValue === '0'
        ? ''
        : currentValue;
    return (
      <>
        <div id={id} className="box" onClick={this.handleClick}>
          {value}
        </div>
      </>
    );
  }
}
