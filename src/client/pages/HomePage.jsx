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
            user: {},
            lobbies: []
        };

        this.createLobby = this.createLobby.bind(this);
        this.signIn = this.signIn.bind(this);
        this.joinLobby = this.joinLobby.bind(this);
    }

    componentDidMount() {
        this.socket.on('update user', data => this.setState({ user: data }));
        this.socket.on('update lobbies', data => this.setState({ lobbies: data}));
        this.socket.on('status', data => console.log(data));
    }

    createLobby() {
       this.socket.emit('create lobby');
    }

    signIn() {
        let username = prompt("Please enter a name");

        if (!username)
            return;

        this.socket.emit('login', {name: username});
    }

    joinLobby(lobbyId) {
        this.socket.emit('join lobby', {id: lobbyId});
    }

    render() {
        return (
            <div className="container">
                <NavBar user={this.state.user} loginHandler={this.signIn} />
                <div>
                    <header>
                        <h2>Lobby</h2>
                        <button onClick={this.createLobby} className="btn btn--green">New Game</button>
                    </header>
                    <div className="rooms">
                        {
                            this.state.lobbies.map((lobby, index) => (
                                <Lobby key={index} id={lobby.id} 
                                       name={lobby.meta.name} 
                                       status={lobby.meta.status} 
                                       joinHandler={this.joinLobby} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;