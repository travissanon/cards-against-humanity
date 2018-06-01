import React, { Component } from 'react';
import io from 'socket.io-client';

// Components
import NavBar from '../components/NavBar.jsx';
import Lobby from '../components/Lobby.jsx';

class HomePage extends Component
{
    constructor() {
        super();

        this.socket = io('127.0.0.1:3000');
        this.state = {
            lobbies: []
        };

        this.createLobby = this.createLobby.bind(this);
    }

    componentDidMount() {
        this.socket.on('update lobbies', data => this.setState({ lobbies: data}));
    }

    createLobby() {
       this.socket.emit('create lobby');
    }

    render() {
        return (
            <div className="container">
                <NavBar />
                <div>
                    <header>
                        <h2>Lobby</h2>
                        <button onClick={this.createLobby} className="btn btn--green">New Game</button>
                    </header>
                    <div className="rooms">
                        {
                            this.state.lobbies.map((lobby, index) => (
                                <Lobby key={index} name={lobby.meta.name} status={lobby.meta.status} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;