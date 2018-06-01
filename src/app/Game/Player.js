const uuid = require('uuid/v4');

class Player
{
    /**
     * Player
     */
    constructor(name, score)
    {
        this.id = uuid();
        this.name = name;
        this.score = score;
        this.cards = [];
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