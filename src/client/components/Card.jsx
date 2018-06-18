import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hand__card">
        <p>Japanese water</p>
      </div>
    );
  }
}

export default Card;