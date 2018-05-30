class GameCore
{
    /**
     * Game Core
     */
    constructor() {
        this.sessions = [];
    }

    /**
     * Create session
     * @param  {Session} host
     * @return {Void}
     */
    createSession(host) {
        let newSesh = new Session(host);

        this.sessions.push(newSesh);
    }

    /**
     * Remove session
     * @param  {Session} session
     * @return {Void}
     */
    deleteSession(session) {
        this.sessions[session] = null;
    }
}

module.exports = GameCore;