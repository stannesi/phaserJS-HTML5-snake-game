// menu state

var menu = {
    // preload
    preload: function() {
        // menu image
        game.load.image('menu', 'assets/images/menu.png');
    },
    
    // create
    create: function() {
        // make screen a button
        game.add.button(0, 0, 'menu', this.startGame, this);
    },
    
    // start menu splash
    startGame: function() {
        // change the state of the game
        game.state.start('mainGame');
    }
};