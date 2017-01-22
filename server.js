const express = require('express');
const app = express();
const WebSocketServer = require('ws').Server
const MOVE_SPEED = 100;
const server = require('http').createServer();
const wss = new WebSocketServer({ server });
const PORT = 8081;

app.use(express.static('./public'));

let players = new Map();
let id = 0;

wss.on('connection', ((ws) => {
  let playerId = null;

  if(players.size === 0) {
    players.set('monitor', ws);
  } else {
    playerId = `player${id}`;
  }

  let playerInfo = {
    id: id,
    ws: ws,
    x: 0,
    y: 0,
    shoot: false,
    speed: false
  }

  players.set(playerId, playerInfo);
  id++

  ws.on('message', (message) => {

    players.forEach((player, playerInfo, map) => {
      if(player.ws === ws) {
        controlHandler(player, message);
      }
    })
  });

  const controlHandler = (player, msg) => {

  let monitor = players.get('monitor')
  let message = `player${player.id} ${msg}`;
  monitor.send(message)
}

  ws.on('end', () => {
    console.log('Connection ended...');
  });
}));

server.on('request', app);
server.listen(PORT, _ =>
  console.log('Server Listening on ' + server.address().port)
);

module.exports = app;