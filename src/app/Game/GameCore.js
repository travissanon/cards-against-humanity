const Session = require('./Session');

class GameCore
{
    /**
     * Game Core
     */
    constructor() {
        this.gameSessions = [];
    }

    /**
     * Create session
     * @param  {Session} host
     * @return {Void}
     */
    createSession(host) {
        this.deleteCurrentHosted(host.id);
        
        let lobbyDetails = {name: `${Math.random() * 100}`, status: false};
        let newSesh = new Session(host.id, lobbyDetails);

        this.gameSessions.push(newSesh);
    }

    /**
     * Remove session
     * @param  {Session} session
     * @return {Void}
     */
    deleteSession(session) {
        delete this.gameSessions[session];
    }

    /**
     * Remove any currently hosted session by user
     * @param  {Int} id
     * @return {Void}
     */
    deleteCurrentHosted(id) {
        let newSessions = this.gameSessions.filter(session => {
            return session.host !== id;
        });

        this.gameSessions = newSessions;
    }
}

module.exports = GameCore;