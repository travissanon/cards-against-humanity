import React, { Component } from 'react';

// Components
import User from './User.jsx';
import Timer from './Timer.jsx';

class FooterBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="footerbar">
        <Timer />
        <div className="footerbar__users">
          {
            this.props.lobby.players &&
            this.props.lobby.players.map((player, index) => (
              <User player={player} key={index} />
            ))
          }
        </div>
      </div>
    );
  }
  
}

export default FooterBar;