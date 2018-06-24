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
    socket.broadcast.to(`lobby-${session.id}`).emit('update clock', session.clock);  
  }

  /**
   * Create new game session
   * @param  {Socket} socket client socket
   * @return {Void}
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

    // Update lobby list
    socket.emit('update lobbies', this.gameSessions);
    socket.broadcast.emit('update lobbies', this.gameSessions);
    socket.emit('change lobby', newSesh.id);
  }

  /**
   * Remove session
   * @param  {Session} session
   * @return {Void}
   */
  deleteSession(sessionId) {
    this.gameSessions = this.gameSessions.filter(session => {
      return session.id !== sessionId;
    });
  }

  /**
   * Remove any currently hosted session by user
   * @param  {Int} id
   * @return {Void}
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
   * @return {Void}
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

    socket.emit('status', 'joined lobby');
    socket.emit('update cards', socket.user.cards);
    socket.broadcast.to('lobby-' + lobbyId).emit('status', `${socket.user.name} has joined`);

    //Update players in lobby
    socket.emit('update lobby', lobby);
    socket.broadcast.to('lobby-' + lobbyId).emit('update lobby', lobby);
  }

  /**
   * Disconnect from a lobby
   * @param  {Socket} socket  client socket
   * @param  {Uuid} lobbyId Lobby Id
   * @return {Void}
   */
  leaveSession(socket, lobbyId) {
    if (!socket.user.session)
      return;

    let lobby = this.getSession(lobbyId);
    
    if (!lobby)
      return;

    // Remove player
    socket.leave('lobby-' + lobbyId);
    socket.user.session = "";
    lobby.removePlayer(socket.user);

    // Leave status
    socket.emit('status', 'left lobby');
    socket.broadcast.to('lobby-' + lobbyId).emit('status', `${socket.user.name} has left`);

    // Update lobby
    socket.emit('update lobby', {});
    socket.broadcast.to('lobby-' + lobbyId).emit('update lobby', lobby);
  }
}

module.exports = GameCore;