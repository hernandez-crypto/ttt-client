import React, { Component } from 'react';
import './Square.css';

export default class Square extends Component {
  handleClick = () => {
    let { id, setChoice } = this.props;
    setChoice(id);
  };

  render() {
    const { id } = this.props;
    let value =
      typeof this.props.currentValue === 'number' ||
      this.props.currentValue === '0'
        ? ''
        : this.props.currentValue;
    return (
      <div id={`${id}`} className="box" onClick={this.handleClick}>
        <h3>{value}</h3>
      </div>
    );
  }
}
