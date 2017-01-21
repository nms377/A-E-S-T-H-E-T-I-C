console.log('open: ');
var ws = new WebSocket("ws://127.0.0.1:8081");

ws.onopen = function (event) {
  console.log('Connection is open ...');
  ws.send("Hello Server");
};

ws.onerror = function (err) {
  console.log('err: ', err);
}

ws.onmessage = function (event) {
  console.log(event.data);
  document.body.innerHTML += event.data + '<br>';
};

ws.onclose = function() {
  console.log("Connection is closed...");
}

const btnClicked = (btn) => {
  switch(btn) {
    case 'up':
    ws.send('up')
    break;

    case 'down':
    ws.send('down')
    break;

    case 'right':
    ws.send('right')
    break;

    case 'left':
    ws.send('left')
    break;

    case 'blue':
    ws.send('blue')
    break;

    case 'red':
    ws.send('red')
    break;

    case 'yellow':
    ws.send('yellow')
    break;

    case 'green':
    ws.send('green')
    break;
  }
}