
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
    const WORLD_SIZE = 5000;
    const NUMBER_OF_OBSTACLES = 14;
    const NUMBER_OF_ENEMIES = 30;
    let playerBullets;
    let player2Bullets;
    var greenEnemies;

    const preload = _ => {
        game.stage.backgroundColor = '#85b5e1';
        game.load.image('player', 'public/assets/blue_dolphin.png')
        game.load.image('player2', 'public/assets/pink_dolphin.png')
        game.load.image('platform', 'public/assets/roman_column_length_small.png');
        game.load.image('bullets', 'public/assets/windows_logo.png');
        game.load.image('enemy-green', 'public/assets/baddie_one.png');
    };

    const create = _ => {
        game.world.resize(WORLD_SIZE, 600);
        player = game.add.sprite(200, 200, 'player');
        player2 = game.add.sprite(100, 100, 'player2');

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        game.physics.arcade.enable(player2, Phaser.Physics.ARCADE);
        player.body.onWorldBounds = new Phaser.Signal()

        player.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;

        // create obstacles
        platforms = game.add.physicsGroup();
        for (i = 0; i < NUMBER_OF_OBSTACLES; i++) {
            platforms.create(randomFix(game.world.randomX), game.world.randomY, 'platform');
        }
        platforms.setAll('body.immovable', true);

        // create bullets
        game.physics.startSystem(Phaser.Physics.ARCADE);
        playerBullets = game.add.group();
        player2Bullets = game.add.group();

        // create baddies
        greenEnemies = game.add.group();
        greenEnemies.enableBody = true;
        greenEnemies.physicsBodyType = Phaser.Physics.ARCADE;
        greenEnemies.create(game.world.randomX, game.world.randomY, 'enemy-green');
        greenEnemies.setAll('anchor.x', 0.5);
        greenEnemies.setAll('anchor.y', 0.5);
        greenEnemies.setAll('outOfBoundsKill', true);
        greenEnemies.setAll('checkWorldBounds', true);
        launchGreenEnemy();

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
        
        handleBulletAnimations();
        handleBulletCollisions();
        handlePlayerFire();

    };

    function launchGreenEnemy() {
        for (i = 0; i < NUMBER_OF_ENEMIES; i++) {
            greenEnemies.create(game.world.randomX, game.world.randomY, 'enemy-green');
        };
    };

    const handlePlayerFire = _ => {
        if (player.shoot) {
            playerBullets.add(game.add.sprite(player.x, player.y, bullets, 7));
        }
        if (player2.shoot) {
            player2Bullets.add(game.add.sprite(player2.x, player2.y, bullets, 7));
        }
    };

    const handleBulletAnimations = _ => {
        playerBullets.children.forEach(bullet => bullet.x += PLAYER_BULLET_SPEED);
        player2Bullets.children.forEach(bullet => bullet.x += PLAYER_BULLET_SPEED);
    };

    function handleBulletCollisions() {
        let enemiesHit = greenEnemies.children.filter(enemy => playerBullets.children.some(bullet => bullet.overlap(enemy)));
        enemiesHit.forEach(enemy => enemy.destroy());
        let enemies2Hit = greenEnemies.children.filter(enemy => player2Bullets.children.some(bullet => bullet.overlap(enemy)));
        enemies2Hit.forEach(enemy => enemy.destroy());
    };

    function generateObstacles() {
        platforms = game.add.group();
        platforms.enableBody = true;

        for (i = 0; i < NUMBER_OF_OBSTACLES ; i++) {
            platforms.create(randomFix(game.world.randomX), game.world.randomY, 'platform');
        };
        platforms.setAll('body.immovable', true);

    };

    // don't spawn anything for first 500 pixels
    function randomFix(randomX) {
        if (randomX < 500) return randomX + 500;
        else return randomX;
    };

    const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_CONTAINER_ID, { preload, create, update });


})(window.Phaser);