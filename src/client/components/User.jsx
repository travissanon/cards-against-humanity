import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randColor: this.iconColor(),
      name: this.hyphenate(this.props.player.name)
    };
  }

  iconColor() {
    const colors = ['#ef5350', '#9CCC65', '#5C6BC0', '#AB47BC', '#42A5F5'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  hyphenate(name) {
    return name.slice(0, 1).toUpperCase();
  }

  render() {
    return (
      <div 
        style={{background: `${this.state.randColor}`}}
        className="user" 
        title={this.props.player.name}>
        <p>{this.hyphenate(this.state.name)}</p>
      </div>
    );
  }
}

export default User;