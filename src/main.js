const express   = require('express');
const config    = require('../config.js');
const path      = require('path');

const app = express();

app.use('/public/', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, '../public/')
    });
});

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
