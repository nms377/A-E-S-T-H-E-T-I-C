// import Phaser from 'phaser'

// import landingPage from './states/landingPage'
// import gamePage from './states/gamePage'

// import config from './config'

// class Game extends Phaser.Game {

//   constructor () {
//     const docElement = document.documentElement
//     const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
//     const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

//     super(800, 400, Phaser.CANVAS, 'content', null)

//     this.state.add('landingPage', landingPage, false)
//     this.state.add('gamePage', gamePage, false)

//     this.state.start('landingPage')
//   }
// }

// window.game = new Game()