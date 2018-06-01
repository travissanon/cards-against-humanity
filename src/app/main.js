const GameCore = new (require('./Game/GameCore'))();

function handle(socket) {
    socket.emit('update lobbies', GameCore.gameSessions);

    socket.on('create lobby', function() {
        GameCore.createSession(socket);

        socket.emit('update lobbies', GameCore.gameSessions);
        socket.broadcast.emit('update lobbies', GameCore.gameSessions);
    });

    socket.on('disconnect', function() {
        GameCore.deleteCurrentHosted(socket.id);
        socket.broadcast.emit('update lobbies', GameCore.gameSessions);
    });
}

module.exports = handle;