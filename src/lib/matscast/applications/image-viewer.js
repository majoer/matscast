const EventEmitter = require('events');

class ImageViewer extends EventEmitter {

  constructor(websocket) {
    super();

    this.websocket = websocket;
  }

  startSlideshow() {

  }

  pauseSlideshow() {

  }

  stopSlideshow() {

  }

  next() {

  }

  previous() {

  }
}

module.exports = ImageViewer;
