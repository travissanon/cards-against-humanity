const express   = require('express');
const app       = express();
const http      = require('http').Server(app);
const io        = require('socket.io')(http);
const config    = require('../config');
const path      = require('path');
const handle    = require('./app/main');

app.use('/public/', express.static(path.join(__dirname, '../public')));

app.get('/*', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, '../public/')
    });
});

io.on('connection', handle);

http.listen(config.port, () => console.log(`Listening on port ${config.port}`));
