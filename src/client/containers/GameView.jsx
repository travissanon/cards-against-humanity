import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
// Components
import Hand from '../components/Hand.jsx';
import Table from '../components/Table.jsx';
import FooterBar from '../components/FooterBar.jsx';

class GameView extends Component {
  constructor(props) {
    super(props);

    let params = qs.parse(this.props.location.search);

    this.state = {
      timer: 60,
      isHost: params.h !== undefined ? true : false,
      timerInterval: null
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    if (!this.props.user)
      this.props.history.push('/');

    if (this.state.isHost) {
      let intervalId = setInterval(this.tick, 1010);

      this.setState({ timerInterval: intervalId });
    }

    this.props.socket.emit('join lobby', this.props.match.params.id);
    this.props.socket.on('update cards', cards => this.props.updateHand(cards));
    this.props.socket.on('update lobby', lobby => this.props.updateLobby(lobby));
    this.props.socket.on('update clock', time => this.setState({ timer: time }));
    this.props.socket.on('status', data => console.log(data));
  }

  componentWillUnmount() {
    this.props.socket.off('update cards');
    this.props.socket.off('update lobby');
    this.props.socket.off('update clock');
    this.props.socket.off('status');

    if (this.state.isHost && this.state.timerInterval)
      clearInterval(this.state.timerInterval);
  }

  tick() {
    this.setState({ 
      timer: this.state.timer - 1
    });

    this.props.socket.emit('set clock', this.state.timer);
  }

  render() {
    return (
      <div className="container">
        <Table />
        <Hand cards={this.props.hand} />
        <FooterBar time={this.state.timer} lobby={this.props.lobby} />
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