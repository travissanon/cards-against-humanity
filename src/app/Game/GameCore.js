class GameCore
{
    /**
     * Game Core
     */
    constructor() {
        this.sessions = new Map();
    }

    /**
     * Create session
     * @param  {Session} host
     * @return {Void}
     */
    createSession(host) {
        let newSesh = new Session(host);

        this.sessions.set(newSesh.id, newSesh);
    }

    /**
     * Remove session
     * @param  {Session} session
     * @return {Void}
     */
    deleteSession(session) {
        this.sessions.delete(session.id);
    }
}

module.exports = GameCore;