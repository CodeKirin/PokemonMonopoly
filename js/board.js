function Board(stage, windowWidth, windowHeight) {

  this.board = new PIXI.Container();

  // All board tiles
  this.allBoardTiles = [];



  /***************************************** Board Setup *****************************************/
                                             /* Tiles */
  // Corner tiles
  var corner1Start = PIXI.Texture.fromImage("images/jail.png");
  var corner2Jail = PIXI.Texture.fromImage("images/jail.png");
  var corner3Parking = PIXI.Texture.fromImage("images/jail.png");
  var corner4GoJail = PIXI.Texture.fromImage("images/jail.png");

  var corner2 = new PIXI.Sprite(corner2Jail);
  corner2.position.x = 125;
  corner2.position.y = 1000;
  this.board.addChild(corner2);

  var corner3 = new PIXI.Sprite(corner3Parking);
  corner3.position.x = 125;
  corner3.position.y = 0;
  this.board.addChild(corner3);

  // Bottom tiles


  var tile3Onix = PIXI.Texture.fromImage("images/onix.png");
  var tile4Gary = PIXI.Texture.fromImage("images/gary.png");

  var tile6Staryu = PIXI.Texture.fromImage("images/staryu.png");
  var tile7Oak = PIXI.Texture.fromImage("images/oak.png");
  var tile8Starmie = PIXI.Texture.fromImage("images/starmie.png");
  var tile9Horsea = PIXI.Texture.fromImage("images/horsea.png");
  var bottomTiles = [corner1Start, tile3Onix, tile3Onix, tile3Onix, tile3Onix, tile4Gary,
  tile6Staryu, tile7Oak, tile8Starmie, tile9Horsea];

  // Left tiles
  var tile2Voltorb = PIXI.Texture.fromImage("images/voltorb.png");
  var leftTiles = [tile2Voltorb, tile2Voltorb, tile2Voltorb, tile2Voltorb, tile2Voltorb, tile2Voltorb,
  tile2Voltorb, tile2Voltorb, tile2Voltorb];

  // Top tiles
  var topTiles = [tile3Onix, tile3Onix, tile3Onix, tile3Onix, tile4Gary,
  tile6Staryu, tile7Oak, tile8Starmie, tile9Horsea, corner4GoJail];

  // Right tiles
  var rightTiles = [tile2Voltorb, tile2Voltorb, tile2Voltorb, tile2Voltorb, tile2Voltorb, tile2Voltorb,
  tile2Voltorb, tile2Voltorb, tile2Voltorb];


                        /* Sides */
  //var x = windowWidth - 2020;
  //var x = windowWidth - 1900;
  var x = windowWidth - 370;
  var y = windowHeight - 324;

  // Bottom
  for (var i = 0; i < 10; i++) {
    var tile = new Tile(bottomTiles[i]);
    tile.setPosition(x, y);
    tile.addToContainer(this.board);

    x -= 153;
    this.allBoardTiles.push(tile);
  }

  x -= 100;
  y += 100;
  // Left
  for ( var i = 0; i < 8; i++ ) {
      var tile = new Tile(leftTiles[i]);
    tile.setPosition(x, y);
    tile.addToContainer(this.board);

    y -= 152;
    this.allBoardTiles.push(tile);
  }

  // Top
  x += 253;
  y = 40;
  for (var i = 0; i < 10; i++) {
    var tile = new Tile(topTiles[i]);
    tile.setPosition(x, y);
    tile.addToContainer(this.board);

    x += 153;
    this.allBoardTiles.push(tile);
  }

  // Right
  x -= 100;
  for ( var i = 0; i < 8; i++ ) {
      var tile = new Tile(rightTiles[i]);

    tile.setPosition(x, y);
    tile.addToContainer(this.board);

    y += 152;
    this.allBoardTiles.push(tile);
  }


  stage.addChild(this.board);
}




Board.prototype.getAllBoardTiles = function () {
  return this.allBoardTiles;

}
