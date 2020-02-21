import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextTransition, { presets } from 'react-text-transition';
import './LandingPage.css';

const TEXTS = [
  'Web Multiplayer',
  'Local Multiplayer',
  'Impossible Mode',
  'Play with a Friend'
];

const LINKS = [
  'https://media.giphy.com/media/l1Et6k00qp9fMTP8s/giphy.gif',
  'https://media.giphy.com/media/3oriNKQe0D6uQVjcIM/giphy.gif',
  'https://media.giphy.com/media/RPZu7v6zA2WOI/giphy.gif'
];

export default class LandingPage extends Component {
  state = { index: 0 };

  componentDidMount() {
    setInterval(
      () => this.setState((state) => ({ index: state.index + 1 })),
      8000
    );
  }

  render() {
    let { index } = this.state;

    return (
      <div className="landingPage">
        <div>
          <TextTransition
            text={TEXTS[index % TEXTS.length]}
            springConfig={presets.wobbly}
            className="changingText"
          />
        </div>
        <div className="happyRobots">
          <img
            width="100%"
            src={LINKS[index % LINKS.length]}
            alt={'{ ROBOTS : 1 , HUMANS : 0 }'}
          />
        </div>
        <div className="playOptions">
          <div className="landingLinks">
            <h2>
              <Link to="/offline">Offline</Link>
            </h2>

            <h2>
              <Link to="/online">Online</Link>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
