import React, { Component } from 'react';

class Lobby extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="lobby">
                <p className="lobby--name">{this.props.name}</p>
                <p className="lobby--status">
                    {this.props.status ? 'Private' : 'Public'}
                </p>
                <button className="btn btn--blue">Join</button>
            </div>
        );
    }
}

export default Lobby;