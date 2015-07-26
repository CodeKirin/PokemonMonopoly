function game()
{

	gameClient();
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
    window.stage = new PIXI.Container();
    window.gameBoard = new Board(stage, windowWidth, windowHeight);

		stage.scale.x = 0.99;
		stage.scale.y = 0.99;



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
