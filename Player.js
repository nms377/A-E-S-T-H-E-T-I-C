module.exports = class Player {

  constructor(game, x, y, id) {
    this.game = game;
    this.id = [];
  }

  setId(client) {
    this.id = {
      id: 1,
      client: client
    }
  }

  getId() {
    return this.id;
  }

  controlHandler(msg) {
    console.log(`received: ${msg}`);
  }
}