module.exports = (() => {
  let players = []
  let id = 0;

  const addPlayer = (ws) => {
    let newPlayer = {
        id: id,
        ws: ws,
        x: 0,
        y: 0,
        shoot: false,
        speed: false
      }
    players.push(newPlayer);
    console.log(players);
    id++
  }

  const getPlayer = (ws) => {
    let toReturn = null;
    players.forEach( player => {
      if(player.ws === ws) {
        toReturn = player;
      }
    })
    return toReturn;
  }

  const getLength = () => {
    return players.length
  }

  return {
    addPlayer,
    getPlayer,
    getLength
  }

})()