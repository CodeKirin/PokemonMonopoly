function Dice() {
  var scope = this;
  scope.diceMovieClips = [];
  var imageIds = [];

  for (var i = 1; i <= 6; i++ ) {
    imageIds.push('diceRoller/dices-' + i + '.gif');
    imageIds.push('diceRoller/dicet-' + i + '.gif');

  }
  imageIds = _.shuffle(imageIds);
  for (var i = 1; i <= 6;i++ ) {
    var endId = 'diceRoller/die-' + i + '.gif';
    scope.diceMovieClips.push(PIXI.extras.MovieClip.fromImages(_.union(imageIds, [endId])));
  }
}


Dice.prototype.rollDice = function(stage, number) {
  var scope = this;
  var dice = scope.diceMovieClips[number - 1];

  dice.position.set(300);
  dice.loop  = false;
  dice.animationSpeed = 0.2;
  stage.addChild(dice);
  dice.gotoAndPlay(0);





}
