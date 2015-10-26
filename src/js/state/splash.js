// splash state
var splash = {
    duration: 100,
    // preload
    preload: function() {
        // splash image
        game.load.image('splash', 'assets/images/splash.png');  
    },
    
    // create
    create: function() {
        // add sprite
        game.add.sprite(0, 0, 'splash');
    },
    // update
    update: function(){
        this.duration--;
        if (this.duration <= 0)
            this.loadMenu();
        
    },
    
    // start menu splash
    loadMenu: function() {
        // change the state of the game
        game.state.start('menu');
    }
};