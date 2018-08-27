const EventEmitter = require('events');
const {
  EVENT_AUDIO_PLAY,
  EVENT_AUDIO_PAUSE,
  EVENT_AUDIO_STOP,
  EVENT_AUDIO_SEEK,
  EVENT_AUDIO_STEP_FORWARDS,
  EVENT_AUDIO_STEP_BACKWARDS,
  EVENT_AUDIO_VOLUME,
  EVENT_AUDIO_MUTE,
  EVENT_AUDIO_UNMUTE
} = require('../matscast-events');

class AudioPlayer extends EventEmitter {

  constructor(sendMessage) {
    super();

    this.sendMessage = sendMessage;
  }

  handleMessage(message) {
    if (message.event.startsWith('EVENT_AUDIO')) {
      this.emit(message.event);
    }
  }

  play() {
    this.sendMessage(EVENT_AUDIO_PLAY);
  }

  pause() {
    this.sendMessage(EVENT_AUDIO_PAUSE);
  }

  stop() {
    this.sendMessage(EVENT_AUDIO_STOP);
  }

  seek(position) {
    this.sendMessage(EVENT_AUDIO_SEEK, position);
  }

  stepForwards() {
    this.sendMessage(EVENT_AUDIO_STEP_FORWARDS);
  }

  stepBackwards() {
    this.sendMessage(EVENT_AUDIO_STEP_BACKWARDS);
  }

  setVolume(volume) {
    this.sendMessage(EVENT_AUDIO_VOLUME, volume);
  }

  mute() {
    this.sendMessage(EVENT_AUDIO_MUTE);
  }

  unmute() {
    this.sendMessage(EVENT_AUDIO_UNMUTE);
  }
}

module.exports = AudioPlayer;
