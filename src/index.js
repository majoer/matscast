const Matscast = require('./lib/index');

const ws = new WebSocket('ws://localhost:2000');
const matscast = new Matscast(ws);

console.log('Created websocket');

function scrollToBottom() {
  const body = document.body;
  const html = document.documentElement;
  const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  scrollTo(0, height);
}

matscast.on(Matscast.EVENT_MESSAGE, (message) => {
  const div = document.createElement('div');
  div.innerHTML = JSON.stringify(message, null, 4);

  document.querySelector('#out_msg').appendChild(div);

  scrollToBottom();
});
