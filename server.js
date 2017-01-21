const express = require('express');
const app = express();
const controller = require('./routes/controller');
// // const { Server : WebSocketServer } = require('ws');
// // const server = require('http').createServer();
// // const wss = new WebSocketServer({ server });

// const WebSocketServer = require('ws').Server
// const wss = new WebSocketServer({ port: 3000 });

app.use('/controller', controller);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// wss.on('connection', ((ws) => {
//   ws.on('message', (message) => {
//     console.log(`received: ${message}`);
//   });

//   ws.on('end', () => {
//     console.log('Connection ended...');
//   });

//   ws.send('Hello Client');
// }));

// // server.on('request', app);
// // server.listen(3000, function(){
// //   console.log('listening on *:3000');
// // });



'use strict';

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', ((ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);
  });

  ws.on('end', () => {
    console.log('Connection ended...');
  });

  ws.send('Hello Client');
}));

module.exports = app;