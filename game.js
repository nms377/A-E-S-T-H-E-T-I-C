((Phaser, sendMess) => {
    const GAME_WIDTH = 1000;
    const GAME_HEIGHT = 600;
    const GAME_CONTAINER_ID = 'game';
    const GFX = 'gfx';
    //const INITIAL_MOVESPEED = 4;
    var movespeed = 2000;
    var cameraSpeed = 3;
    var i = 0;
    var player;
    var platforms;
    var cursors;
    var jumpButton;


    const preload = _ => {
        //game.load.spritesheet(GFX, 'assets/spritesheet.png', 28, 28);

        // temeplate preload code
        game.stage.backgroundColor = '#85b5e1';
        game.load.baseURL = 'http://examples.phaser.io/assets/';
        game.load.crossOrigin = 'anonymous';
        game.load.image('player', 'sprites/phaser-dude.png');
        game.load.image('platform', 'sprites/platform.png');
        // end template code
    };


    const create = _ => {
        // resize world
        game.world.resize(5000, 480);

        // template create code

        player = game.add.sprite(200, 200, 'player');

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;
        // player.body.gravity.y = 500;

        platforms = game.add.physicsGroup();

        // create platforms
        platforms.create(500, 150, 'platform');
        platforms.create(-200, 300, 'platform');
        platforms.create(400, 450, 'platform');
        for (i = 0; i < 15; i++)
        {
            platforms.create(game.world.randomX, game.world.randomY, 'platform');

            //game.add.sprite(game.world.randomX, game.world.randomY, 'player');
        }

        platforms.setAll('body.immovable', true);

        cursors = game.input.keyboard.createCursorKeys();
        cursors.fire = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // end template code

        //the camera will follow the player in the world
        //game.camera.follow(player);

        //   Usually you'd provide a callback to the `game.physics.arcade.collide` function,
        //   which is passed the two sprites involved in the collision, which you can then
        //   perform further processing on. However you can also use this signal:
        player.body.onCollide = new Phaser.Signal();
        player.body.onCollide.add(hitSprite, this);

    };

    function hitSprite(sprite1, sprite2)
    {
        sprite1.angle += 5;
    }

    var ws = new WebSocket("ws://10.0.1.94:8081");

    ws.onopen = function (event) {
      console.log('Connection is open ...');
    };

    ws.onerror = function (err) {
      console.log('err: ', err);
    }

    ws.onmessage = function (msg) {
      console.log(msg.data);
      if(msg.data === 'right') {
        player.body.velocity.x += movespeed
      }
    };

    ws.onclose = function() {
      console.log("Connection is closed...");
    }

    const update = _ => {
      ws.onmessage = function (msg) {

        switch(msg.data) {
          case 'up':
          player.body.velocity.y -= movespeed
          break;

          case 'down':
          player.body.velocity.y += movespeed
          break;

          case 'left':
          player.body.velocity.x -= movespeed
          break;

          case 'right':
          player.body.velocity.x += movespeed
          break;

          case 'green':
          player.shoot = true;
          break;

          case 'red':
          player.speed = true;
          break;
        }

      };

        game.physics.arcade.collide(player, platforms);
        game.camera.x += 1;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
    };

    // game.state.add('Game', PhaserGame, true);
    // reference for game instantiated here
    const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_CONTAINER_ID, { preload, create, update });


})(window.Phaser, window.sendMess);