class Session
{
    /**
     * Session
     */
    constructor(host, options = {})
    {
        this.id             = 1; // TODO: Gen uuid
        this.host           = host;
        this.options        = options;
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