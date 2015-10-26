var gameOver = {
    // preload
    preload: function() {
        // menu image
        game.load.image('gameOver', './assets/images/game-over.png');
    },
    
    // create
    create: function() {
        // make screen a button
        this.add.button(0, 0, 'gameOver', this.startGame, this);
        
        game.add.text(240, 145, "LAST SCORE:", { font: "bold 30px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(450, 145, score.toString(), { font: "bold 30px sans-serif", fill: "#fff", align: "left"});
    },
    
    // start menu splash
    startGame: function() {
        // change the state of the game
        this.state.start('mainGame');
    }
};