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
    this.currentCard    = {};
    this.players        = [];
  }

  /**
   * Add player to session
   * @param {Player} player - player to add
   */
  addPlayer(player) {
    this.players.push(player);
  }

  /**
   * Remove player from session
   * @param {Player} player - player to remove
   */
  removePlayer(player) {
    this.players = this.players.filter(currPlayer => {
      return currPlayer.id !== player.id;
    });
  }
}

module.exports = Session;