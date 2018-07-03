import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);

    this.renderBlackCard = this.renderBlackCard.bind(this);
  }

  renderBlackCard() {
    if (this.props.blackCard) {
      return <p>{this.props.blackCard.text}</p>;
    }

    return <p>Error loading card</p>; 
  }

  render() {
    return (
      <div className="table">
        <div className="table__card--black">
          {this.renderBlackCard()}
        </div>
        <div className="table__card--holder">
          <p>Place card here</p>
        </div>
      </div>
    );
  }
}

export default Table;