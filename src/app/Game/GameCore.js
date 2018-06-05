const Session = require('./Session');

class GameCore
{
    /**
     * Game Core
     */
    constructor() {
        this.gameSessions = [];
    }

    /**
     * Create new game session
     * @param  {Socket} socket client socket
     * @return {Void}
     */
    createSession(socket) {
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
        let newSessions = this.gameSessions.filter(session => {
            return session.host !== id;
        });

        this.gameSessions = newSessions;
    }

    /**
     * Join game session
     * @param  {Socket} socket  client socket
     * @param  {Uuid} lobbyId Lobby id
     * @return {Void}
     */
    joinSession(socket, lobbyId) {        
        socket.join('lobby-' + lobbyId);
        // Update user's current session
        socket.user.session = lobbyId;

        socket.emit('status', 'joined lobby');
        socket.broadcast.to('lobby-' + lobbyId).emit('status', `${socket.user.name} has joined`);
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

        socket.leave('lobby-' + lobbyId);
        // Update user's current session
        socket.user.session = "";

        socket.emit('status', 'left lobby');
        socket.broadcast.to('lobby-' + lobbyId).emit('status', `${socket.user.name} has left`);
    }
}

module.exports = GameCore;