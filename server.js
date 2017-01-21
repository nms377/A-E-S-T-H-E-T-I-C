const express = require('express');
const app = express();
const controller = require('./routes/controller');
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8081 });

app.use('/controller', controller);

wss.on('connection', ((ws) => {

  ws.on('message', (message) => {
    controlHandler(message);
  });

  ws.on('end', () => {
    console.log('Connection ended...');
  });
}));

const controlHandler = (msg) => {
  console.log(`received: ${msg}`);
}

module.exports = app;