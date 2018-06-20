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
        {
          this.props.cards.map((card, index) => (
            <Card key={index} text={card.text} />
          ))
        }
      </div>
    );
  }
}

export default Hand;