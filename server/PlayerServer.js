player = function (id){
  this.id = id;
  this.name = "";
  this.onTile = 0;
  this.ready = false;
}

player.prototype.onDiceRoll = function (diceNumber) {
  this.onTile = (this.onTile + diceNumber) % 30;
}

player.prototype.changeName = function (name) {
  this.name = name;
}

player.prototype.isReady = function () {
  this.ready = true;
}
