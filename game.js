
(Phaser => {
    const GAME_WIDTH = 1000;
    const GAME_HEIGHT = 600;
    const GAME_CONTAINER_ID = 'game';
    const GFX = 'gfx';
    var movespeed = 250;
    var cameraSpeed = 0;
    var i = 0;
    var player;
    var player2;
    var platforms;
    var startCamera = false;

    const preload = _ => {
        game.stage.backgroundColor = '#85b5e1';
        game.load.image('player', 'public/assets/blue_dolphin.png')
        game.load.image('player2', 'public/assets/pink_dolphin.png')
        game.load.image('platform', 'public/assets/roman_column_length_small.png');
    };


    const create = _ => {
        game.world.resize(5000, 480);
        player = game.add.sprite(200, 200, 'player');
        player2 = game.add.sprite(100, 100, 'player2');

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        game.physics.arcade.enable(player2, Phaser.Physics.ARCADE);
        player.body.onWorldBounds = new Phaser.Signal()

        player.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;

        platforms = game.add.physicsGroup();
        platforms.create(200, 500, 'platform');
        // platforms.create(-200, 300, 'platform');
        platforms.create(400, 450, 'platform');
        for (i = 0; i < 14; i++) {
          platforms.create(game.world.randomX, game.world.randomY, 'platform');
        }
        platforms.setAll('body.immovable', true);


        //   Usually you'd provide a callback to the `game.physics.arcade.collide` function,
        //   which is passed the two sprites involved in the collision, which you can then
        //   perform further processing on. However you can also use this signal:
        // player.body.onCollide = new Phaser.Signal();
        // player.body.onCollide.add(hitSprite, this);
        // player2.body.onCollide = new Phaser.Signal();
        // player2.body.onCollide.add(hitSprite, this);

    };

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
        startCamera = true;

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
          player.body.velocity.x = movespeed
          break;

          case 'player1 green':
          player.shoot = true;
          break;

          case 'player1 red':
          player.body.velocity.x += 4000;
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

          case 'player2 resd':
          player2.speed = true;
          break;
        }

      };

        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player2, platforms);

        if(startCamera) {
          game.camera.x += 2;
        }


    };

    const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_CONTAINER_ID, { preload, create, update });


})(window.Phaser);