function game()
{


	// Displays info to player based on the tile landed
	function displayTileInfo(type) {
	  if (type == "pokemon") {

	  } else if (type == "ball") {

	  } else if (type == "trainer") {

	  } else if (type == "oak") {

	  } else if (type == "organization") {

	  } else if (type == "utility") {

	  } else if (type == "jail") {

	  } else if (type == "start") {

	  }
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


    document.getElementById('game-container').appendChild(renderer.view);
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


  // DICE
	// TODO: replace with server rolled number
	var dice = new Dice();
	$("#roll-button").click(function() {
		socket.emit('roll_dice');
	})

	$("#ready-button").click(function() {
		socket.emit('player_ready');
	})
  socket.on('dice_rolled', function(data) {
		dice.rollDice(stage, data.dice);
	})


  // start animating
	animate();
	function animate(time) {
	    requestAnimationFrame(animate);
	    // render the container
			renderer.render(stage);
			TWEEN.update(time);
    }
}
