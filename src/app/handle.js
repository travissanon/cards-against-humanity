const GameCore = new (require('./Game/GameCore'))();
const Player = require('./Game/Player');

function handle(socket) {
  // Add user object to each socket
  socket.constructor.prototype.user = {};

  socket.emit('update lobbies', GameCore.gameSessions);

  socket.on('login', function(user) {
    socket.user = new Player(user.name);
    // Update client info
    socket.emit('update user', socket.user);
  });

  socket.on('create lobby', function() {
    GameCore.createSession(socket);
  });

  socket.on('join lobby', function(lobbyId) {
    GameCore.joinSession(socket, lobbyId);
  });

  socket.on('set clock', function(time) {
    GameCore.updateClock(socket, time);
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