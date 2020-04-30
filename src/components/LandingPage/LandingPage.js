import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextTransition, { presets } from 'react-text-transition';
import TicTacToe from '../Tic-Tac-Toe/Offline/Tic-Tac-Toe';
import './LandingPage.css';

const TEXTS = ['Web Multiplayer', 'Local Multiplayer', 'Play with a Friend'];

export default class LandingPage extends Component {
  state = { index: 0 };

  async componentDidMount() {
    try {
      this.updateIndex = setInterval(
        () => this.setState((state) => ({ index: state.index + 1 })),
        8000
      );
    } catch (e) {
      console.log(e);
    }
  }
  componentWillUnmount() {
    clearInterval(this.updateIndex);
  }
  render() {
    let { index } = this.state;

    return (
      <div className="landingPage">
        <div className="changingText__container">
          <TextTransition
            text={TEXTS[index % TEXTS.length]}
            springConfig={presets.wobbly}
            className="changingText"
          />
        </div>
        <div className="middleContent">
          <TicTacToe mode="computers" />
        </div>
        <div className="playOptions">
          <div className="landingLinks">
            <h2 className="landingOfflineText">
              <Link to="/offline">Offline</Link>
            </h2>

            <h2 className="landingOnlineText">
              <Link to="/online">Online</Link>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
