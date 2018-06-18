import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="table">
        <div className="table__card--black">
          <p>Did you drink japanese water?</p>
        </div>
        <div className="table__card--holder">
          <p>Place card here</p>
        </div>
      </div>
    );
  }
}

export default Table;