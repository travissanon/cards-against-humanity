import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import Hand from '../components/Hand.jsx';
import Table from '../components/Table.jsx';
import FooterBar from '../components/FooterBar.jsx';

class GameView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.user)
      this.props.history.push('/');

    this.props.socket.emit('join lobby', this.props.match.params.id);
    this.props.socket.on('update cards', cards => this.props.updateHand(cards));
    this.props.socket.on('update lobby', lobby => this.props.updateLobby(lobby));
    this.props.socket.on('status', data => console.log(data));
  }

  componentWillUnmount() {
    this.props.socket.off('update cards');
    this.props.socket.off('update lobby');
    this.props.socket.off('status');
  }

  render() {
    return (
      <div className="container">
        <Table />
        <Hand cards={this.props.hand} />
        <FooterBar lobby={this.props.lobby} />
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    lobby: state.lobby.currentLobby,
    hand: state.player.hand
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateHand: (cards) => {
      dispatch({type: 'UPDATE_HAND', payload: cards});
    },
    updateLobby: (lobby) => {
      dispatch({type: 'UPDATE_CURRENTLOBBY', payload: lobby});
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameView);