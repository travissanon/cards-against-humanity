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
    this.clock          = 0;
    this.czar           = {};
  }

  /**
   * Switch czar role to next player
   * @returns {Void}
   */
  nextCzar() {
    let czarIndex = this._getPlayerIndex(this.czar);

    czarIndex++;

    if (czarIndex >= this.players.length)
      czarIndex = 0;

    let newCzar = this.players[czarIndex];

    this.czar = newCzar;
    console.log(`Changed czar to ${newCzar.name}`);
  }

  /**
   * End player turn
   * @param {Player} selectedPlayer 
   */
  endTurn(selectedPlayer = false) {
    if (selectedPlayer) {
      selectedPlayer.givePoint();
    }
    
    this.nextCzar();
  }

  /**
   * Get player index from this.players
   * @param {Player} player 
   * @returns {boolean | integer}
   */
  _getPlayerIndex(player) {
    let playerIndex = this.players.findIndex(currPlayer => {
      return currPlayer.id == player.id;
    });

    return playerIndex == -1 ? false : playerIndex;
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