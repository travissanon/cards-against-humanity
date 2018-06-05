const GameCore = new (require('./Game/GameCore'))();
const Player = require('./Game/Player');

function handle(socket) {
    socket.emit('update lobbies', GameCore.gameSessions);

    socket.on('login', function(user) {
        socket.constructor.prototype.user = new Player(user.name);
        // Update client info
        socket.emit('update user', socket.user);
    });

    socket.on('create lobby', function() {
        GameCore.createSession(socket);
    });

    socket.on('join lobby', function(lobby) {
        GameCore.joinSession(socket, lobby.id);
    });

    socket.on('disconnect', function() {
        // Delete any hosted games when user disconnects
        GameCore.deleteCurrentHosted(socket.id);

        if (socket.user)
            GameCore.leaveSession(socket, socket.user.session);
        
        // Update lobby info
        socket.broadcast.emit('update lobbies', GameCore.gameSessions);
    });
}

module.exports = handle;