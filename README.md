# Matscast

Usable in both Node and browser.


## How to use

#### Browser
```
const Matscast = require('./lib/index');
const matscast = new Matscast(new WebSocket('ws://localhost:2000'));

matscast.on(Matscast.EVENT_MESSAGE, () => {...});
```

#### Node
```
const WebSocket = require('ws');
const Matscast = require('../src/lib/index');

const server = new WebSocket.Server({
  port: 2000
});

server.on('connection', (ws) => {
  const matscast = new Matscast(ws);

  matscast.on(Matscast.EVENT_MESSAGE, (message) => {...});
});
```

## Properties
- matscast.audioPlayer
- matscast.videoPlayer
- matscast.imageViewer

## Events
