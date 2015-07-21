function Board(stage, windowWidth, windowHeight) {

  this.board = new PIXI.Container();

  // All board tiles
  this.allBoardTiles = [];

  /***************************************** Board Setup *****************************************/
                                             /* Tiles */
  // Corner tiles
  var corner1Start = PIXI.Texture.fromImage("images/gogogo.png");
  var corner2Jail = PIXI.Texture.fromImage("images/jail.png");
  var corner3Parking = PIXI.Texture.fromImage("images/freeparking.png");
  var corner4GoJail = PIXI.Texture.fromImage("images/gotojail.png");

  // Bottom tiles
  var tile1Geodude = PIXI.Texture.fromImage("images/geodude.png");
  var tile2AshBot = PIXI.Texture.fromImage("images/ash(bot).png");
  var tile3Onix = PIXI.Texture.fromImage("images/onix.png");
  var tile4Gary = PIXI.Texture.fromImage("images/gary.png");
  var tile5Pokeball = PIXI.Texture.fromImage("images/pokeball.png");
  var tile6Staryu = PIXI.Texture.fromImage("images/staryu.png");
  var tile7OakBot = PIXI.Texture.fromImage("images/oak(bot).png");
  var tile8Starmie = PIXI.Texture.fromImage("images/starmie.png");
  var tile9Horsea = PIXI.Texture.fromImage("images/horsea.png");
  var bottomTiles = [corner1Start, tile1Geodude, tile2AshBot, tile3Onix, tile4Gary,
  tile5Pokeball, tile6Staryu, tile7OakBot, tile8Starmie, tile9Horsea];

  // Left tiles
  var tile1Voltorb = PIXI.Texture.fromImage("images/voltorb.png");
  var tile2Zapdos = PIXI.Texture.fromImage("images/zapdos.png");
  var tile3Electabuzz = PIXI.Texture.fromImage("images/electabuzz.png");
  var tile4Raichu = PIXI.Texture.fromImage("images/raichu.png");
  var tile5Greatball = PIXI.Texture.fromImage("images/greatball.png");
  var tile6Victreebel = PIXI.Texture.fromImage("images/victreebel.png");
  var tile7AshLeft = PIXI.Texture.fromImage("images/ash(left).png");
  var tile8Tangela = PIXI.Texture.fromImage("images/tangela.png");
  var tile9Vileplume = PIXI.Texture.fromImage("images/vileplume.png");
  var leftTiles = [corner2Jail, tile1Voltorb, tile2Zapdos, tile3Electabuzz, tile4Raichu,
  tile5Greatball, tile6Victreebel, tile7AshLeft, tile8Tangela, tile9Vileplume];

  // Top tiles
  var tile1Kadabra = PIXI.Texture.fromImage("images/kadabra.png");
  var tile2OakTop = PIXI.Texture.fromImage("images/oak(top).png");
  var tile3MrMime = PIXI.Texture.fromImage("images/mrmime.png");
  var tile4Venomoth = PIXI.Texture.fromImage("images/venomoth.png");
  var tile5Ultraball = PIXI.Texture.fromImage("images/ultraball.png");
  var tile6Koffing = PIXI.Texture.fromImage("images/koffing.png");
  var tile7Muk = PIXI.Texture.fromImage("images/muk.png");
  var tile8Articuno = PIXI.Texture.fromImage("images/articuno.png");
  var tile9Weezing = PIXI.Texture.fromImage("images/weezing.png");
  var topTiles = [tile1Kadabra, tile2OakTop, tile3MrMime, tile4Venomoth, tile5Ultraball,
  tile6Koffing, tile7Muk, tile8Articuno, tile9Weezing, corner4GoJail];

  // Right tiles
  var tile1Growlithe = PIXI.Texture.fromImage("images/growlithe.png");
  var tile2Ponyta = PIXI.Texture.fromImage("images/ponyta.png");
  var tile3AshRight = PIXI.Texture.fromImage("images/ash(right).png");
  var tile4Rapidash = PIXI.Texture.fromImage("images/rapidash.png");
  var tile5Masterball = PIXI.Texture.fromImage("images/masterball.png");
  var tile6OakRight = PIXI.Texture.fromImage("images/oak(right).png");
  var tile7Nidoqueen = PIXI.Texture.fromImage("images/nidoqueen.png");
  var tile8TeamRocket = PIXI.Texture.fromImage("images/teamrocket.png");
  var tile9Nidoking = PIXI.Texture.fromImage("images/nidoking.png");
  var rightTiles = [tile1Growlithe, tile2Ponyta, tile3AshRight, tile4Rapidash, tile5Masterball,
  tile6OakRight, tile7Nidoqueen, tile8TeamRocket, tile9Nidoking];

                        /* Sides */
  var x = windowWidth - 370;
  var y = windowHeight - 227;

  // Bottom
  for (var i = 0; i < 10; i++) {
    var tile = new Tile(bottomTiles[i]);
    tile.setPosition(x, y);
    tile.addToContainer(this.board);

    x -= 80;
    this.allBoardTiles.push(tile);
  }

  x -= 55;
  // Left
  for ( var i = 0; i < 10; i++ ) {
    var tile = new Tile(leftTiles[i]);
    tile.setPosition(x, y);
    tile.addToContainer(this.board);

    y -= 80;
    this.allBoardTiles.push(tile);
  }

  y = 0;
  var corner3Tile = new Tile(corner3Parking);
  corner3Tile.setPosition(x, y);
  corner3Tile.addToContainer(this.board);
  this.allBoardTiles.push(corner3Tile);

  // Top
  x += 134;
  for (var i = 0; i < 10; i++) {
    var tile = new Tile(topTiles[i]);
    tile.setPosition(x, y);
    tile.addToContainer(this.board);

    x += 80;
    this.allBoardTiles.push(tile);
  }

  // Right
  x -= 81;
  y = 134;
  for ( var i = 0; i < 9; i++ ) {
    var tile = new Tile(rightTiles[i]);

    tile.setPosition(x, y);
    tile.addToContainer(this.board);

    y += 80;
    this.allBoardTiles.push(tile);
  }

  stage.addChild(this.board);
}

Board.prototype.getAllBoardTiles = function () {
  return this.allBoardTiles;
}
