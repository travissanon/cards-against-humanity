const uuid = require('uuid/v4');

class Player
{
  /**
   * Player
   */
  constructor(name)
  {
    this.id      = uuid();
    this.name    = name;
    this.score   = 0;
    this.cards   = [];
    this.session = '';
  }

  /**
   * Give white card to player
   * @param  {Card} card white card
   * @return {Void}
   */
  giveCard(card) {
    this.cards.push(card);
  }

  /**
   * Give point to player
   * @return {Void}
   */
  givePoint() {
    this.score++;
  }

  /**
   * Remove point from player
   * @return {Void}
   */
  removePoint() {
    this.score--;
  }
}

module.exports = Player;