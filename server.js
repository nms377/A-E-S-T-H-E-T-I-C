const express = require('express');
const app = express();
const controller = require('./routes/controller');
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8081 });
const players = require('./players.js')
const MOVE_SPEED = 100;

app.use('/controller', controller);

app.use(express.static('./public'));

// app.set('view engine', '.hbs');

// app.engine('.hbs', exphbs({
//   extname:'.hbs',
//   defaultLayout:'main',
// }))

// let players = []
// let id = 0;

const addPlayer = (ws) => {
  let newPlayer = {
      id: id,
      ws: ws,
      x: 0,
      y: 0
    }
  players.push(newPlayer);
  id++
}

wss.on('connection', ((ws) => {
  let len = players.getLength();

  if(len === 4) {
    ws.send('sorry too many players');
  } else {
    players.addPlayer(ws);
  }

  ws.on('message', (message) => {
    let player = players.getPlayer(ws);
    controlHandler(player, message);
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

module.exports = app;