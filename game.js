(Phaser => {
    const GAME_WIDTH = 1000;
    const GAME_HEIGHT = 600;
    const GAME_CONTAINER_ID = 'game';
    const GFX = 'gfx';
    //const INITIAL_MOVESPEED = 4;
    var movespeed = 500;
    var cameraSpeed = 3;
    var i = 0;
    // set wrap variable
    var wrapping = true;
    var justWrapped = false;

    var player;
    var platforms;
    var cursors;
    var jumpButton;
    var widthResize = 3000;
    var numberOfObstacles = 30;
    var randomX;
    let playerBullets;
    var greenEnemies;
    let enemyBullets;

    const PLAYER_BULLET_SPEED = 18;
    const ENEMY_BULLET_ACCEL = 100;

    const preload = _ => {
        game.stage.backgroundColor = '#85b5e1';
        // load boolets
        game.load.spritesheet(GFX, 'assets/spritesheet.png', 28, 28);
        //game.load.baseURL = 'http://examples.phaser.io/assets/';
        game.load.crossOrigin = 'anonymous';
        game.load.image('player', 'http://examples.phaser.io/assets/sprites/phaser-dude.png');
        game.load.image('platform', 'http://examples.phaser.io/assets/sprites/diamond.png');
        game.load.image('enemy-green', 'http://examples.phaser.io/assets/sprites/space-baddie.png');
    };

    const create = _ => {
        // resize world
        game.world.resize(widthResize, 600);
        console.log("game.width = ", game.width);

        player = game.add.sprite(201, 200, 'player');
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        //kill on out of bonds
        player.events.onOutOfBounds.add(playerOutOfBounds, this);
        player.checkWorldBounds = true;

        platforms = game.add.physicsGroup();
        //game.physics.arcade.enable(platforms);
        generateObstacles();

        cursors = game.input.keyboard.createCursorKeys();

        // create bullet things
        game.physics.startSystem(Phaser.Physics.ARCADE);
        cursors.fire = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        cursors.fire.onUp.add(handlePlayerFire);
        playerBullets = game.add.group();

        // create baddies
        greenEnemies = game.add.group();
        greenEnemies.enableBody = true;
        greenEnemies.physicsBodyType = Phaser.Physics.ARCADE;
        greenEnemies.create(game.world.randomX, game.world.randomY, 'enemy-green');
        //greenEnemies.createMultiple(25, 'enemy-green');
        greenEnemies.setAll('anchor.x', 0.5);
        greenEnemies.setAll('anchor.y', 0.5);
        greenEnemies.setAll('outOfBoundsKill', true);
        greenEnemies.setAll('checkWorldBounds', true);
        launchGreenEnemy();

        //   Usually you'd provide a callback to the `game.physics.arcade.collide` function,
        //   which is passed the two sprites involved in the collision, which you can then
        //   perform further processing on. However you can also use this signal:
        //player.body.onCollide = new Phaser.Signal();
        //player.body.onCollide.add(handleCollisions, this);

        // camera will always follow player
        //game.camera.follow(player);

    };

    const update = _ => {
        game.physics.arcade.collide(player, platforms);

        // camera is always moving forward at cameraSpeed
        game.camera.x += cameraSpeed;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -movespeed;
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = movespeed;
        }
        else if (cursors.up.isDown) {
            player.body.velocity.y = -movespeed;
        }
        else if (cursors.down.isDown) {
            player.body.velocity.y = movespeed;
        }

        //wrap god
        //We do a little math to determine whether the game world has wrapped around.
        //If so, we want to destroy everything and regenerate, so the game will remain random
        if (!wrapping && player.x < game.width) {
            console.log("wrapping");
            console.log("player.x =", player.x);
            //We only want to destroy and regenerate once per wrap, so we test with wrapping var
            wrapping = true;
            platforms.destroy();
            generateObstacles();
            game.camera.x = 0;
            justWrapped = true;
        }
       //else if (player.x >= game .width)
        else if (player.x >= (widthResize - 200)) {
            console.log("else if player.x =", player.x, ">=", widthResize - 200, ", wrapping=", wrapping);
            wrapping = false;
        }
        else {
            //console.log("else player.x =", player.x);
            justWrapped = false;
        }
        //The game world is infinite in the x-direction, so we wrap around.
        //We subtract padding so the player will remain in the middle of the screen when
        //wrapping, rather than going to the end of the screen first.
        game.world.wrap(player, -200, false, true, false);

        handleBulletAnimations();
        handleBulletCollisions();
        //game.physics.arcade.collide(player, platforms, handleCollisions);

        // check if out of camera bounds
        if (!player.inWorld && !justWrapped) playerOutOfBounds(player);
        //launchGreenEnemy();

    };

    function launchGreenEnemy() {
        for (i = 0; i < numberOfObstacles  ; i++) {
            //game.add.sprite(game.world.randomX, game.world.randomY, 'diamond');
            //platforms.create(game.world.randomX - (game.width), game.world.randomY, 'platform');
            greenEnemies.create(game.world.randomX, game.world.randomY, 'enemy-green');
        };
    };

    const handlePlayerFire = _ => {
        playerBullets.add(game.add.sprite(player.x, player.y, GFX, 7));
    };

    const handleBulletAnimations = _ => {
        playerBullets.children.forEach(bullet => bullet.x += PLAYER_BULLET_SPEED);
        //enemyBullets.children.forEach(bullet => {
        //    game.physics.arcade.accelerateToObject(bullet, player, ENEMY_BULLET_ACCEL);
        //});
    };

    // do this when collide happens
    function handleBulletCollisions() {
        let enemiesHit = greenEnemies.children.filter(enemy => playerBullets.children.some(bullet => bullet.overlap(enemy)));
        enemiesHit.forEach(enemy => enemy.destroy());
        //console.log("collision");
        //playerBullets.children.filter(bullet => greenEnemies.children.)

    };

    function generateObstacles() {
        console.log("generate");
        platforms = game.add.group();

        //enable physics in them
        platforms.enableBody = true;

        // create platforms
        for (i = 0; i < numberOfObstacles  ; i++) {
            //game.add.sprite(game.world.randomX, game.world.randomY, 'diamond');
            //platforms.create(game.world.randomX - (game.width), game.world.randomY, 'platform');
            platforms.create(randomfix(game.world.randomX), game.world.randomY, 'platform');
        };
        platforms.setAll('body.immovable', true);

        // dont have platforms at beginning or end of loop
        function randomfix(randomX) {
            if (randomX >= (widthResize - game.width)) return randomX - game.width;
            else if (randomX < game.width) return randomX + game.width;
            else return randomX;
        };
    };

    // do this when player out of bounds
    function playerOutOfBounds(player) {
        console.log("player OOB");
        justWrapped = false;
        player.kill();
        game.destroy();
    };

    // reference for game instantiated here
    const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_CONTAINER_ID, { preload, create, update });


})(window.Phaser);
