const WebSocket = require('isomorphic-ws');
const log = require('node-log')(__filename);
const Matscast = require('..');

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

  const intervalHook = setInterval(() => {
    matscast.audioPlayer.play();
  }, 1000);

  matscast.on(Matscast.EVENT_DISCONNECTED, () => {
    clearInterval(intervalHook);
  })
});
