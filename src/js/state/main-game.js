// main game state
var snake,              // snake object
    fruit,              // fruit object
    squareSize,
    updateDelay,
    direction,
    newDirection,
    addNew,
    controller,
    score,              // game score
    speed,              // game speed
    
    scoreTextValue,     // game score text
    speedTextValue,     // game speed text
    
    scoreTextStyle,     // text style CSS
    speedTextStyle;     // text style CSS
    

var mainGame = {
    // preload
    preload: function() {
        // snake 
        game.load.image('snake-tile', 'assets/images/snake-tile.png');
        // fruit
        game.load.image('fruit', 'assets/images/fruit.png');
    },
    
    // create
    create: function() {
        snake = [];             // this will work as a stack, containing the parts of our snake
        fruit = {};             // an object for the fruit
        squareSize = 15;        // length of a side of the square. Our imaage is 15x15 pixels.
        score = 0;              // game score
        speed = 0;              // game speed
        updateDelay = 0;        // variable to controil update rates
        direction = 'right';    // direction of our snake
        newDirection = null;    // buffer to store new direction
        addNew = false;         // variable used when a fruit has been eaten
        
        // set up Phaser controller for keyboaerd input
        controller = game.input.keyboard.createCursorKeys();
        
        game.stage.backgroundColor = '#061f27';
        
        // generate the snake stack
        for (var i = 0; i < 10; i++) {
            // parameters are (x coordinate, y coordinate, image)
            snake[i] = game.add.sprite(150 + i * squareSize, 150, 'snake-tile')
        }
        
        // generate the first fruit
        this.generateFruit();

        // score text style
        scoreTextStyle = { font: 'bold 14px sans-serif', fill: '#46c0f9', align: 'center' };
        // speed text style
        speedTextStyle = { font: 'bold 14px sans-serif', fill: '#fff', align: 'center' };
        // score
        game.add.text(30, 20, 'SCORE:', scoreTextStyle);
        scoreTextValue = game.add.text(90, 20, score.toString(), scoreTextStyle);  
        // speed
        game.add.text(30, 40, 'SPEED:', speedTextStyle)
        speedTextValue = game.add.text(90, 40, speed.toString(), speedTextStyle);
    },
    
    update: function() {
        // update the game field every time.
        if (controller.right.isDown && direction != 'left') {
            // move right
            newDirection = 'right';
        } else if (controller.left.isDown && direction != 'right') {
            // move left
            newDirection = 'left';
        } else if (controller.up.isDown && direction != 'up') {
            // move up
            direction = 'up';
        } else if (controller.down.isDown && direction != 'up') {
            // move down
            direction = 'down';
        }
        
        // game speed [max: 10]
        speed = Math.min(10, Math.floor(score / 5));

        // update speed value on the game screen
        speedTextValue.text = speed.toString();
       
        // increase a counter on every update call
        updateDelay++;
        
        // making the snake move faster
        if (updateDelay % (10 - speed) == 0) {      
            // snake movement
            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellX = lastCell.x,
                oldLastCellY = lastCell.y;
            
            // new direction has been chose from the keyboard
            if (newDirection) {
                direction = newDirection;
                newDirection = null;
            }
            
            if (direction == 'right') {
                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            } else if (direction == 'left') {
                lastCell.x = firstCell.x -15;
                lastCell.y = firstCell.y;                  
            } else if (direction == 'up') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;                
            } else if (direction == 'down') {
                lastCell.x = firstCell.x ;
                lastCell.y = firstCell.y + 15;
            }
            
            // place the last cell in the front of the stack
            // mark is the first cell
            snake.push(lastCell);
            firstCell = lastCell;
            
            if (addNew) {
                snake.unshift(game.add.sprite(oldLastCellX, oldLastCellY, 'snake-tile'));
                addNew = false;
            }
            
            // fruit collision
            this.fruitCollision();
            
            this.selfCollision(firstCell);
            
            this.wallCollision(firstCell);
        }
    },
    
    generateFruit: function() {
        // chose a random place on the grid.
        // x is between 0 and 585 (39 * 20)
        // y is between 0 and 435 (29 * 15)
        var randX = Math.floor(Math.random() * 40 ) * squareSize,
            randY = Math.floor(Math.random() * 30 ) * squareSize;
        
        // add a new fruit
        fruit = game.add.sprite(randX, randY, 'fruit');
    },
    
    fruitCollision: function() {
        for (var i = 0; i < snake.length; i++ ) {
            if (snake[i].x == fruit.x && snake[i].y == fruit.y) {
                
                addNew = true;
                
                fruit.destroy();
                
                this.generateFruit();
                
                score++;
                
                scoreTextValue.text = score.toString();
            }
        }
    },

    selfCollision: function(head) {
        for (var i = 0; i < snake.length - 1; i++ ) {
            if (head.x == snake[i].x && head.y == snake[i].y) {
                // game over screen
                game.state.start('gameOver');
            }
        }
    },
    
    wallCollision: function(head) {
        if (head.x >= 800 || head.x < 0 || head.y >= 600 || head.y < 0) {
            // game over screen
            game.state.start('gameOver');
        }      
    }
};