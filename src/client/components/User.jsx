import React, { Component } from 'react';

class User extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="user" title={this.props.player.name} />
    );
  }
  
}

export default User;