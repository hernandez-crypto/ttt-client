import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import { Link } from 'react-router-dom';

export default class MainPage extends Component {
  // If I ever make more games this is the place where they would be listed
  render() {
    return (
      <Section className="MainPage">
        <h2>Welcome</h2>
        <Link to="/tic-tac-toe">
          <h3>Play Tic-Tac-Toe</h3>
        </Link>
      </Section>
    );
  }
}
