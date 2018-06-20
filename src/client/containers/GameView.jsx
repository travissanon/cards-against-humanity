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
    this.props.socket.on('status', data => console.log(data));
  }

  componentWillUnmount() {
    this.props.socket.off('status');
  }

  render() {
    return (
      <div className="container">
        <Table />
        <Hand />
        <FooterBar />
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
    updateLobbies: (lobbies) => {
      dispatch({type: 'UPDATE_LOBBIES', payload: lobbies})
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameView);