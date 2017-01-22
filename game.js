
(Phaser => {
    const GAME_WIDTH = 1000;
    const GAME_HEIGHT = 600;
    const GAME_CONTAINER_ID = 'game';
    const GFX = 'gfx';
    //const INITIAL_MOVESPEED = 4;
    var movespeed = 2000;
    var cameraSpeed = 3;
    var i = 0;
    var player;
    var player2;
    var platforms;

    const preload = _ => {

        game.stage.backgroundColor = '#85b5e1';
        // game.load.baseURL = 'http://examples.phaser.io/assets/';
        game.load.crossOrigin = 'anonymous';
        // game.load.image('dolphin', 'blue-dolphin.png');
        // game.load.image('player', 'sprites/phaser-dude.png')
        game.load.image('player', 'public/assets/fiji_water.png')
        game.load.image('platform', 'sprites/platform.png');
    };


    const create = _ => {
        game.world.resize(5000, 480);

        player = game.add.sprite(200, 200, 'player');
        player2 = game.add.sprite(100, 100, 'player');

        game.physics.arcade.enable(player);
        game.physics.arcade.enable(player2);

        player.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;

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
        // end template code

        //the camera will follow the player in the world
        //game.camera.follow(player);

        //   Usually you'd provide a callback to the `game.physics.arcade.collide` function,
        //   which is passed the two sprites involved in the collision, which you can then
        //   perform further processing on. However you can also use this signal:
        player.body.onCollide = new Phaser.Signal();
        player.body.onCollide.add(hitSprite, this);
        player2.body.onCollide = new Phaser.Signal();
        player2.body.onCollide.add(hitSprite, this);

    };

    function hitSprite(sprite1, sprite2) {
        sprite1.angle += 5;
    }

    var ws = new WebSocket("ws://10.0.1.94:8081");

    ws.onopen = function (event) {
      console.log('Connection is open ...');
    };

    ws.onerror = function (err) {
      console.log('err: ', err);
    }

    ws.onclose = function() {
      console.log("Connection is closed...");
    }

    const update = _ => {
      ws.onmessage = function (message) {
        console.log(message.data);

        switch(message.data) {
          case 'player1 up':
          player.body.velocity.y -= movespeed
          break;

          case 'player1 down':
          player.body.velocity.y += movespeed
          break;

          case 'player1 left':
          player.body.velocity.x -= movespeed
          break;

          case 'player1 right':
          player.body.velocity.x += movespeed
          break;

          case 'player1 green':
          player.shoot = true;
          break;

          case 'player1 red':
          player.speed = true;
          break;

           case 'player2 up':
          player2.body.velocity.y -= movespeed
          break;

          case 'player2 down':
          player2.body.velocity.y += movespeed
          break;

          case 'player2 left':
          player2.body.velocity.x -= movespeed
          break;

          case 'player2 right':
          player2.body.velocity.x += movespeed
          break;

          case 'player2 green':
          player2.shoot = true;
          break;

          case 'player2 red':
          player2.speed = true;
          break;
        }

      };

        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player2, platforms);

        game.camera.x += 0;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player2.body.velocity.x = 0;
        player2.body.velocity.y = 0;
    };

    const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_CONTAINER_ID, { preload, create, update });


})(window.Phaser);