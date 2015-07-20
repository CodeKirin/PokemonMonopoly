
// Creating an object for each tile
function Tile(texture) {
  this.sprite = new PIXI.Sprite(texture);
};

Tile.prototype.addToContainer = function(container) {
  container.addChild(this.sprite);
};

Tile.prototype.setPosition = function (x, y) {
  this.sprite.position.x = x || 0;
  this.sprite.position.y = y || 0;
};

Tile.prototype.getPositionSize = function () {
  return {
    x: this.sprite.position.x,
    y: this.sprite.position.y,
    width: this.sprite.width,
    height: this.sprite.height
  };
};
