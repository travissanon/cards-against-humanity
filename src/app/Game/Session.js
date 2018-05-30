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
        this.players        = [];
        this.currentCard    = {};
    }

    /**
     * Add player
     * @param {Player} player
     */
    addPlayer(player) {
        this.players.push(player);
    }

    /**
     * Remove player
     * @param  {Player} player
     * @return {Void}
     */
    removePlayer(player) {
        this.players[player] = null;
    }
}

module.exports = Session;