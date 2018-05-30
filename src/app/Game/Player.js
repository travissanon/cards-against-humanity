class Player
{
    /**
     * Player
     */
    constructor(name, score)
    {
        this.id = 1; // TODO: Gen uuid
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