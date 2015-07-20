function Player(display) {
  this.display = display;
}

Player.prototype.moveTo = function (tile) {
  //this.container.moveTo(tile.getPosition.x, tile.getPosition.y);
  var p = tile.getPositionSize();
  var scope = this;
  scope.currentTile = tile;
  var tween = new TWEEN.Tween( { x: this.display.position.x, y: this.display.position.y } )
    .to( { x: p.x + (p.width /2) , y: p.y + (p.height /2)}, 2000 ) // TODO: Move position calculation logic into Tile
    .easing( TWEEN.Easing.Elastic.InOut )
    .onUpdate( function () {
      scope.display.position.set(this.x, this.y);
    })
    .start();
}

Player.prototype.addToStage = function (stage) {
  stage.addChild(this.display);
}


// Rectangle - subclass
function PlayerFromMovie(movie) {
  Player.call(this, movie); // call super constructor.
}

function PlayerFromTexture(texture) {
    this.sprite = texture //new PIXI.Sprite(texture);
    Player.call(this, this.sprite)

}

// subclass extends superclass
PlayerFromMovie.prototype = Object.create(Player.prototype);
PlayerFromTexture.prototype = Object.create(Player.prototype);
