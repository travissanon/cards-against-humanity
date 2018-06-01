import React, { Component } from 'react';

// Components
import NavBar from '../components/NavBar.jsx';
import Lobby from '../components/Lobby.jsx';

class HomePage extends Component
{
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                <NavBar />
                <div>
                    <header>
                        <h2>Lobby</h2>
                        <button className="btn btn--green">New Game</button>
                    </header>
                    <div className="rooms">
                        <Lobby name="test server" status={true} />
                        <Lobby name="test server" status={true} />
                        <Lobby name="test server" status={false} />
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;