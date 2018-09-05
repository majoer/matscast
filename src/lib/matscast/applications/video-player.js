const EventEmitter = require('events');
const {
  EVENT_VIDEO_PLAY,
  EVENT_VIDEO_PAUSE,
  EVENT_VIDEO_STOP,
  EVENT_VIDEO_SEEK,
  EVENT_VIDEO_STEP_FORWARDS,
  EVENT_VIDEO_STEP_BACKWARDS,
  EVENT_VIDEO_VOLUME,
  EVENT_VIDEO_MUTE,
  EVENT_VIDEO_UNMUTE
} = require('../matscast-events');

class VideoPlayer extends EventEmitter {

  constructor(sendMessage) {
    super();

    this.sendMessage = sendMessage;
  }

  handleMessage(message) {
    if (message.event.startsWith('EVENT_VIDEO')) {
      this.emit(message.event);
    }
  }

  play() {
    this.sendMessage(EVENT_VIDEO_PLAY);
  }

  pause() {
    this.sendMessage(EVENT_VIDEO_PAUSE);
  }

  seek(position) {
    this.sendMessage(EVENT_VIDEO_SEEK, position);
  }

  stepForwards() {
    this.sendMessage(EVENT_VIDEO_STEP_FORWARDS);
  }

  stepBackwards() {
    this.sendMessage(EVENT_VIDEO_STEP_BACKWARDS);
  }

  setVolume(volume) {
    this.sendMessage(EVENT_VIDEO_VOLUME, volume);
  }

  mute() {
    this.sendMessage(EVENT_VIDEO_MUTE);
  }

  unmute() {
    this.sendMessage(EVENT_VIDEO_UNMUTE);
  }
}

module.exports = VideoPlayer;
