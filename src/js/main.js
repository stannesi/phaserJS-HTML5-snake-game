// main game object
var game;

// create a new game instance 800px wide and 600px tall:
game = new Phaser.Game(800, 600, Phaser.AUTO, '');

// add phaser splash game state
game.state.add('splash', splash);
game.state.add('menu', menu);
game.state.add('mainGame', mainGame);
game.state.add('gameOver', gameOver);

// start splash State
game.state.start('splash');