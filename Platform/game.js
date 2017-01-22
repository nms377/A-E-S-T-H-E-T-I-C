// JavaScript source code

//jshint esversion:6

(Phaser => {
    const GAME_WIDTH = 640;
    const GAME_HEIGHT = 480;
    const GAME_CONTAINER_ID = 'game';
    const GFX = 'gfx';
    //const INITIAL_MOVESPEED = 4;
    var movespeed = 500;

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

    //let player;
    //let cursors;
    //let playerBullets;
    //let enemies;
    //let enemyBullets;

    //const handlePlayerFire = _ => {
    //    playerBullets.add(game.add.sprite(player.x, player.y, GFX, 7));
    //};

    const create = _ => {
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //cursors = game.input.keyboard.createCursorKeys();
        //cursors.fire = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        //cursors.fire.onUp.add(handlePlayerFire);

        //player = game.add.sprite(100, 100, GFX, 8);
        //player.moveSpeed = INITIAL_MOVESPEED;
        //playerBullets = game.add.group();
        //enemies = game.add.group();
        //enemyBullets = game.add.group();
        //enemyBullets.enableBody = true;

        // template create code

        player = game.add.sprite(100, 200, 'player');

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 500;

        platforms = game.add.physicsGroup();

        platforms.create(500, 150, 'platform');
        platforms.create(-200, 300, 'platform');
        platforms.create(400, 450, 'platform');

        platforms.setAll('body.immovable', true);

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // end template code

    };

    //const handlePlayerMovement = _ => {
    //    let movingH = Math.sqrt(2);
    //    let movingV = Math.sqrt(2);
    //    if (cursors.up.isDown || cursors.down.isDown) {
    //        movingH = 1; // slow down diagonal movement
    //    }
    //    if (cursors.left.isDown || cursors.right.isDown) {
    //        movingV = 1; // slow down diagonal movement
    //    }
    //    switch (true) {
    //        case cursors.left.isDown:
    //            player.x -= player.moveSpeed * movingH;
    //            break;
    //        case cursors.right.isDown:
    //            player.x += player.moveSpeed * movingH;
    //            break;
    //    }
    //    switch (true) {
    //        case cursors.down.isDown:
    //            player.y += player.moveSpeed * movingV;
    //            break;
    //        case cursors.up.isDown:
    //            player.y -= player.moveSpeed * movingV;
    //            break;
    //    }
    //};

    //const PLAYER_BULLET_SPEED = 6;

    //const ENEMY_BULLET_ACCEL = 100;

    //const ENEMY_SPAWN_FREQ = 100; // higher is less frequent
    //const ENEMY_SPEED = 4.5;

    //const removeBullet = bullet => bullet.destroy();

    //const destroyEnemy = enemy => enemy.kill();

    //const ENEMY_FIRE_FREQ = 30; // higher is less frequent

    //const randomEnemyFire = enemy => {
    //    if (Math.floor(Math.random() * ENEMY_FIRE_FREQ) === 0) {
    //        let enemyBullet = game.add.sprite(enemy.x, enemy.y, GFX, 9);
    //        enemyBullet.checkWorldBounds = true;
    //        enemyBullet.outOfBoundsKill = true;
    //        enemyBullets.add(enemyBullet);
    //    }
    //};

    //const handleEnemyActions = _ => {
    //    enemies.children.forEach(enemy => enemy.y += ENEMY_SPEED);
    //    enemies.children.forEach(enemy => randomEnemyFire(enemy));
    //};

    //const gameOver = _ => {
    //    game.state.destroy();
    //    game.add.text(90, 200, 'YOUR HEAD ASPLODE', { fill: '#FF0000' });
    //    let playAgain = game.add.text(120, 300, 'Play Again', { fill: '#FF0000' });
    //    playAgain.inputEnabled = true;
    //    playAgain.events.onInputUp.add(_ => {
    //        window.location.reload();
    //    });
    //};

    //const handleBulletAnimations = _ => {
    //    playerBullets.children.forEach(bullet => bullet.y -= PLAYER_BULLET_SPEED);
    //    enemyBullets.children.forEach(bullet => {
    //        game.physics.arcade.accelerateToObject(bullet, player, ENEMY_BULLET_ACCEL);
    //    });
    //};

    //const randomlySpawnEnemy = _ => {
    //    if (Math.floor(Math.random() * ENEMY_SPAWN_FREQ) === 0) {
    //        let randomX = Math.floor(Math.random() * GAME_WIDTH);
    //        enemies.add(game.add.sprite(randomX, -24, GFX, 0));
    //    }
    //};

    //const handlePlayerHit = _ => {
    //    gameOver();
    //};

    //const handleCollisions = _ => {
    //    // check if any bullets touch any enemies
    //    let enemiesHit = enemies.children
    //      .filter(enemy => enemy.alive)
    //      .filter(enemy => enemy.overlap(playerBullets));

    //    if (enemiesHit.length > 0) {
    //        // clean up bullets that land
    //        playerBullets.children
    //          .filter(bullet => bullet.overlap(enemies))
    //          .forEach(removeBullet);

    //        enemiesHit.forEach(destroyEnemy);
    //    }

    //    // check if enemies hit the player
    //    enemiesHit = enemies.children
    //      .filter(enemy => enemy.overlap(player));

    //    if (enemiesHit.length > 0) {
    //        handlePlayerHit();

    //        enemiesHit.forEach(destroyEnemy);
    //    }
    //    // check if enemy bullets hit the player
    //    let enemyBulletsLanded = enemyBullets.children
    //      .filter(bullet => bullet.overlap(player));

    //    if (enemyBulletsLanded.length > 0) {
    //        handlePlayerHit(); // count as one hit
    //        enemyBulletsLanded.forEach(removeBullet);
    //    }
    //};

    //const cleanup = _ => {
    //    playerBullets.children
    //      .filter(bullet => bullet.y < 0)
    //      .forEach(bullet => bullet.destroy());
    //    enemyBullets.children
    //      .filter(bullet => !bullet.alive)
    //      .forEach(bullet => bullet.destroy());
    //};

    // allows for 60FPS
    const update = _ => {
        //handlePlayerMovement();
        //handleBulletAnimations();
        //handleEnemyActions();
        //handleCollisions();
        //randomlySpawnEnemy();

        // template update code
        game.physics.arcade.collide(player, platforms);

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -movespeed;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = movespeed; 
        }
        else if (cursors.up.isDown)
        {
            player.body.velocity.y = -movespeed;
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = movespeed;
        }
        // end template code

        //cleanup();
    };

    // reference for game instantiated here
    const game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, GAME_CONTAINER_ID, { preload, create, update });


})(window.Phaser);