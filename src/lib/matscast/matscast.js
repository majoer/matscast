const EventEmitter = require('events');
const AudioPlayer = require('./applications/audio-player');
const VideoPlayer = require('./applications/video-player');
const ImageViewer = require('./applications/image-viewer');
const MatscastMessage = require('./matscast-message');
const matscastEvents = require('./matscast-events');

const { EVENT_MESSAGE, EVENT_DISCONNECTED } = matscastEvents;
const STATE_WEBSOCKET_OPEN = 1;

class Matscast extends EventEmitter {

  constructor(webSocket) {
    super();

    if (!webSocket) {
      throw new TypeError(`arg0 must be WebSocket`);
    }

    this.webSocket = webSocket;
    this.name = this.webSocket.url;
    this.audioPlayer = new AudioPlayer((m) => this.sendMessage(m));
    this.videoPlayer = new VideoPlayer((m) => this.sendMessage(m));

    this.webSocket.onerror = (error) => {
      console.log(error);
    };

    this.webSocket.onmessage = (messageEvent) => {
      console.log(messageEvent.data);
      const message = MatscastMessage.parse(messageEvent.data);

      this.audioPlayer.handleMessage(message);
      this.videoPlayer.handleMessage(message);

      this.emit(EVENT_MESSAGE, message);
    };

    this.webSocket.onclose = () => {
      this.emit(EVENT_DISCONNECTED);
    }
  }

  sendMessage(message, payload) {
    if (this.webSocket.readyState === STATE_WEBSOCKET_OPEN) {
      this.webSocket.send(new MatscastMessage(message, payload).toString());
    } else {
      console.log(`Can't send message, websocket ${this.webSocket.url} closed`);
    }
  }
}

Object.assign(Matscast, matscastEvents);

module.exports = Matscast;
