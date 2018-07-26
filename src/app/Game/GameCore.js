const Session = require('./Session');
const Card = require('./Card');

class GameCore
{
  /**
   * Game Core
   */
  constructor() {
    this.gameSessions = [];
  }

  /**
   * Update client time with host
   * @param {Socket} socket 
   * @param {string} newTime
   * @returns {Void}
   */
  updateClock(socket, newTime) {
    if (!socket.user.session)
      return;
    
    let session = null;
    if (!(session = this.getSession(socket.user.session)))
      return;

    if (session.host !== socket.id) {
      console.log("Non-host user tried to change clock");
      return;
    }
  
    session.clock = newTime;
    socket.broadcast.to(`lobby-${session.id}`).emit('lobby command', {
      type: 'update_clock', 
      payload: session.clock
    });
  }

  /**
   * End player's turn and switch czar
   * @param {Socket} socket 
   * @param {Player} selectedPlayer
   * @returns {Void} 
   */
  endPlayerTurn(socket, selectedPlayer) {
    let session = this.getSession(socket.user.session);

    if (!session)
      return;

    session.endTurn(socket.user, selectedPlayer);

    socket.emit('lobby command', {
      type: 'status',
      payload: `Czar has changed to ${session.czar.name}`
    });
  }

  /**
   * Create new game session
   * @param  {Socket} socket client socket
   * @returns {Void}
   */
  createSession(socket) {
    if (!socket.user.name)
      return;
    this.deleteCurrentHosted(socket.id);

    // Create new session
    let lobbyDetails = {name: `${socket.user.name}'s lobby`, status: false};
    let newSesh = new Session(socket.id, lobbyDetails);
    // Update session list
    this.gameSessions.push(newSesh);

    // Update user info
    socket.user.session = newSesh.id;
    // Auto join created session
    socket.join('lobby-' + newSesh.id);

    newSesh.czar = socket.user;
    
    // Starting black card
    newSesh.currentCard = new Card('Did you drink japanese water?');

    // Update lobby list
    socket.emit('update lobbies', this.gameSessions);
    socket.broadcast.emit('update lobbies', this.gameSessions);
    socket.emit('change lobby', newSesh.id);
    socket.emit('lobby command', {
      type: 'status', 
      payload: `New czar is: ${newSesh.czar.name}`
    });
  }

  /**
   * Remove session
   * @param  {Session} session
   * @returns {Void}
   */
  deleteSession(sessionId) {
    this.gameSessions = this.gameSessions.filter(session => {
      return session.id !== sessionId;
    });
  }

  /**
   * Remove any currently hosted session by user
   * @param  {Int} id
   * @returns {Void}
   */
  deleteCurrentHosted(id) {
    this.gameSessions = this.gameSessions.filter(session => {
      return session.host !== id;
    });
  }

  /**
   * Get a session
   * @param {integer} lobbyId - lobby id
   * @returns {Session} session - game session
   */
  getSession(lobbyId) {
    let session = this.gameSessions.filter(session => {
      return session.id == lobbyId;
    });

    if (session.length < 1)
      return false;

    return session[0];
  }

  /**
   * Join game session
   * @param  {Socket} socket  client socket
   * @param  {Uuid} lobbyId Lobby id
   * @returns {Void}
   */
  joinSession(socket, lobbyId) {
    if (!socket.user.name)
      return;

    let lobby = this.getSession(lobbyId);
    
    if (!lobby)
      return;

    // Add player to session
    socket.join('lobby-' + lobbyId);
    socket.user.session = lobbyId;
    lobby.addPlayer(socket.user);

    // testing give cards
    socket.user.giveCard(new Card("Placeholder Text"));
    socket.user.giveCard(new Card("Placeholder Text"));

    socket.emit('lobby command', {type: 'status', payload: 'joined lobby'});
    socket.emit('lobby command', {type: 'update_cards', payload: socket.user.cards});
    socket.broadcast.to('lobby-' + lobbyId).emit('lobby command', {
      type: 'status',
      payload: `${socket.user.name} has joined`
    });

    //Update players in lobby
    socket.emit('lobby command', {type: 'update_lobby', payload: lobby});
    socket.broadcast.to('lobby-' + lobbyId).emit('lobby command', {
      type: 'update_lobby',
      payload: lobby
    });
  }

  /**
   * Disconnect from a lobby
   * @param  {Socket} socket  client socket
   * @returns {Void}
   */
  leaveSession(socket) {
    if (!socket.user.session)
      return;
    
    let lobbyId = socket.user.session;
    let lobby = this.getSession(lobbyId);
    
    if (!lobby)
      return;

    // Remove player
    socket.leave('lobby-' + lobbyId);
    socket.user.session = "";
    lobby.removePlayer(socket.user);

    // Leave status
    socket.emit('lobby command', {type: 'status', payload: 'left lobby'});
    socket.broadcast.to('lobby-' + lobbyId).emit('lobby command', {
      type: 'status',
      payload: `${socket.user.name} has left`
    });

    // Update lobby
    socket.emit('lobby command', {type: 'update_lobby', payload: {}});
    socket.broadcast.to('lobby-' + lobbyId).emit('lobby command', {
      type: 'update_lobby', 
      payload: lobby
    });
  }
}

module.exports = GameCore;