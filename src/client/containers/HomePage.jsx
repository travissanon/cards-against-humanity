import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import NavBar from '../components/NavBar.jsx';
import Lobby from '../components/Lobby.jsx';

class HomePage extends Component
{
  constructor(props) {
    super(props);

    this.createLobby = this.createLobby.bind(this);
    this.signIn = this.signIn.bind(this);
    this.joinLobby = this.joinLobby.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('update user', user => this.props.updateUser(user));
    this.props.socket.on('update lobbies', lobbies => this.props.updateLobbies(lobbies));
    this.props.socket.on('change lobby', lobbyId => this.props.history.push(`/lobby/${lobbyId}?h=1`));
    this.props.socket.on('status', data => console.log(data));
  }

  componentWillUnmount() {
    this.props.socket.off('update user');
    this.props.socket.off('update lobbies');
    this.props.socket.off('change lobby');
    this.props.socket.off('status');
  }

  createLobby() {
    this.props.socket.emit('create lobby');
  }

  signIn() {
    let username = prompt("Please enter a name");

    if (!username)
        return;

    this.props.socket.emit('login', {name: username});
  }

  joinLobby(lobbyId) {
    this.props.history.push(`/lobby/${lobbyId}`);
  }

  render() {
    return (
      <div className="container">
        <NavBar user={this.props.user ? this.props.user : {}} loginHandler={this.signIn} />
        <div>
          <header>
            <h2>Lobby</h2>
            <button onClick={this.createLobby} className="btn btn--green">New Game</button>
          </header>
          <div className="rooms">
              {
                this.props.lobbies.map((lobby, index) => (
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    lobbies: state.lobby.lobbies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch({type: 'SET_USER', payload: user});
    },
    updateLobbies: (lobbies) => {
      dispatch({type: 'UPDATE_LOBBIES', payload: lobbies})
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);