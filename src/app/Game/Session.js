const uuid = require('uuid/v4');

class Session
{
    /**
     * Session
     */
    constructor(host, meta = {})
    {
        this.id             = uuid();
        this.host           = host;
        this.meta           = meta;
        this.players        = new Map();
        this.currentCard    = {};
    }

    /**
     * Add player
     * @param {Player} player
     */
    addPlayer(player) {
        this.players.set(player.id, player);
    }

    /**
     * Remove player
     * @param  {Player} player
     * @return {Void}
     */
    removePlayer(player) {
        this.players.delete(player.id);
    }
}

module.exports = Session;