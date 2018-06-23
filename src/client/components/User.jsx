import React, { Component } from 'react';

class User extends Component {
  constructor() {
    super();
  }
  hyphenate(name) {
    return name.slice(0, 1).toUpperCase();
  }
  render() {
    return (
      <div className="user" title={this.props.player.name}>
        <p>{this.hyphenate(this.props.player.name)}</p>
      </div>
    );
  }
  
}

export default User;