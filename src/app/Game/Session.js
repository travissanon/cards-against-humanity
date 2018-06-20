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
  }
}

module.exports = Session;