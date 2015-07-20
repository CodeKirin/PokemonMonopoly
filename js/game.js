function game()
{		
	// Dice roller
    var dice = D6;
    dice.setBaseUrl("diceRoller/");
    dice.dice(1, attack);
	
    /******************************************* Functions *******************************************/
    // Setting hidden result label
    function attack(result) {
      var allBoardTiles = gameBoard.getAllBoardTiles();

      // Displaying the result of the input for testing
         var currentIndex = allBoardTiles.indexOf(player.currentTile);
         var newIndex = currentIndex == -1  ? newIndex : currentIndex + result;
         newIndex = newIndex >= allBoardTiles.length - 1 ? newIndex - allBoardTiles.length + 1  : newIndex;
        player.moveTo(allBoardTiles[newIndex]);
    }

    /****************************************** Display ***********************************************/
    // Width and height of window for the client
    var windowWidth = window.innerWidth;
    var windowHeight = 1080;//window.innerHeight;
      // Display width and height
    console.log(windowWidth);
    console.log(windowHeight);
    // Renderer
    var renderer = PIXI.autoDetectRenderer(windowWidth, windowHeight);
    document.body.appendChild(renderer.view);
    // Containers
    var stage = new PIXI.Container();
    var gameBoard = new Board(stage, windowWidth, windowHeight);

    // create an array of textures from an image path
    var frames = [];

    for (var i = 0; i < 4; i++) {
		// magically works since the spritesheet was loaded with the pixi loader
		frames.push(PIXI.Texture.fromFrame(i));
	}
	// create a MovieClip (brings back memories from the days of Flash, right ?)
	movie = new PIXI.extras.MovieClip(frames);
	/*
	 * A MovieClip inherits all the properties of a PIXI sprite
	 * so you can change its position, its anchor, mask it, etc
	 */
	movie.position.set(300);
	movie.animationSpeed = 0.1;
    movie.play();

	var player = new PlayerFromMovie(movie);
	player.addToStage(stage);
	player.moveTo(gameBoard.getAllBoardTiles()[0]);

    // start animating
	animate();
	function animate(time) {
	    requestAnimationFrame(animate);
	    // render the container
		renderer.render(stage);
		TWEEN.update(time);
    }	
}
