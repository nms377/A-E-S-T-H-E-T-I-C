var game = new Phaser.Game(1200 , 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('logo', 'public/assets/landing_page_small.png');
    // game.load.image('raster', 'assets/demoscene/pink-raster.png');
    // game.load.image('floor', 'assets/demoscene/checker-floor.png');

}

var effect;
var image;
var mask = new Phaser.Rectangle();

function create() {

    // game.stage.backgroundColor = '#000042';

    // var floor = game.add.image(0, game.height, 'logo');
    // floor.width = 600;
    // floor.anchor.y = 1;

    effect = game.make.bitmapData();
    effect.load('logo');

    image = game.add.image(game.world.centerX, game.world.centerY, effect);
    image.anchor.set(0.5);
    image.smoothed = false;
    // image.height = 100;
    // image.width = 200;


    // mask.setTo(0, 0, effect.width, game.cache.getImage('logo').height);

    //  Tween the rasters
    // game.add.tween(mask).to( { y: -(mask.height - effect.height) }, 3000, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);

    //  Tween the image
    game.add.tween(image.scale).to( { x: 2, y: 2 }, 1000, Phaser.Easing.Quartic.InOut, true, 0, 1000, true);

}

function update() {

    effect.alphaMask('logo', effect, mask);

    image.rotation += 0.01;

}