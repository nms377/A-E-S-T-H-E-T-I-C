const express = require('express');
const app = express();
const WebSocketServer = require('ws').Server
const MOVE_SPEED = 100;
const server = require('http').createServer();
const wss = new WebSocketServer({ server });
const PORT = 8081;

app.use(express.static('./public'));

let players = new Map();
let id = 1;

wss.on('connection', ((ws) => {
  let playerId = `player${id}`;

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
  console.log(players);

  ws.on('message', (message) => {

    players.forEach((player, playerInfo, map) => {
      console.log(player);
      if(player.ws === ws) {
        controlHandler(player, message);
      }
    })
  });

  ws.on('end', () => {
    console.log('Connection ended...');
  });
}));

const controlHandler = (player, msg) => {
  console.log(`player ${player.id} pressed: ${msg}`);
  switch(msg) {
    case 'up':
    player.y -= MOVE_SPEED;
    break;

    case 'down':
    player.y += MOVE_SPEED;
    break;

    case 'left':
    player.x -= MOVE_SPEED;
    break;

    case 'right':
    player.x += MOVE_SPEED;
    break;

    case 'green':
    player.shoot = true;
    break;

    case 'red':
    player.speed = true;
    break;
  }
  console.log('x', player.x, 'y', player.y);

}

server.on('request', app);
server.listen(PORT, _ =>
  console.log('Server Listening on ' + server.address().port)
);

module.exports = app;