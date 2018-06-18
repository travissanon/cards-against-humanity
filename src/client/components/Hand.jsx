import React, { Component } from 'react';

// Components
import Card from './Card.jsx';

class Hand extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hand">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}

export default Hand;