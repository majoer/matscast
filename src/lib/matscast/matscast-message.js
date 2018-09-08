const PREFIX_MESSAGE = 'MATSCAST';

class MatscastMessage {
  constructor(event, payload) {

    if (!event) {
      throw new TypeError('Event must be defined');
    }

    this.event = event;
    this.payload = payload;
  }

  toString() {
    if (this.payload) {
      return `${PREFIX_MESSAGE}:${this.event}:${JSON.stringify(this.payload)}`;
    } else {
      return `${PREFIX_MESSAGE}:${this.event}`;
    }
  }
}

MatscastMessage.parse = function (rawMessage) {
  if (!rawMessage || typeof rawMessage !== 'string') {
    throw new TypeError('arg0 must be string');
  }

  const parts = rawMessage.split(':');

  if (parts[0] !== PREFIX_MESSAGE) {
    throw new Error('MatscastMessage: Wrong format');
  }

  const event = parts[1];
  const payload = !!parts[2];

  if (payload) {
    return new MatscastMessage(event, JSON.parse(payload));
  } else {
    return new MatscastMessage(event);
  }
}

module.exports = MatscastMessage;
