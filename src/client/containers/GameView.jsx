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

    if (!this.props.user)
      this.props.history.push('/');

    let params = qs.parse(this.props.location.search);

    this.state = {
      timer: 60,
      isHost: params.h !== undefined ? true : false,
      timerInterval: null
    };

    this.tick = this.tick.bind(this);
    this.handleCommand = this.handleCommand.bind(this);
  }

  componentDidMount() {
    if (this.state.isHost) {
      let intervalId = setInterval(this.tick, 1000);

      this.setState({ timerInterval: intervalId });
    }

    this.props.socket.emit('join lobby', this.props.match.params.id);
    this.props.socket.on('lobby command', cmd => this.handleCommand(cmd));
  }

  componentWillUnmount() {
    this.props.socket.off('lobby command');

    clearInterval(this.state.timerInterval);
  }

  handleCommand(command) {
    switch(command.type) {
      case "update_cards":
        this.props.updateHand(command.payload);
        break;
      
      case "update_lobby":
        this.props.updateLobby(command.payload);
        break;
      
      case "update_clock":
        this.setState({ timer: command.payload });
        break;
      
      case "status":
        console.log(command.payload);
        break;
    }
  }

  tick() {
    if (this.state.timer < 1) {
      clearInterval(this.state.timerInterval);
      return;
    }
    
    this.setState({ 
      timer: this.state.timer - 1
    });

    this.props.socket.emit('set clock', this.state.timer);
  }

  render() {
    return (
      <div className="container">
        <Table blackCard={this.props.lobby.currentCard} />
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