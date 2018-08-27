const WebSocket = require('ws');
const log = require('node-log')(__filename);
const Matscast = require('../src/lib/index');

const server = new WebSocket.Server({
  port: 2000
});

log('Started Websocket server on port 2000');

server.on('connection', (ws) => {
  const matscast = new Matscast(ws);
  log('ws connected');

  matscast.on('message', (message) => {
    log(message);
  });

  setInterval(() => {
    matscast.audioPlayer.play();
  }, 1000);
});
