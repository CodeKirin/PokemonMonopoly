var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');

require('./PlayerServer');



var players = {};
var currentPlayer = null;
io.on('connection', function(socket){
  console.log(socket.id);
  io.emit('user_join', socket.id);
  players[socket.id] = new player(socket.id);
  if (!currentPlayer) currentPlayer = players[socket.id];
  socket.emit('connected');
  socket.emit('init', players);

  socket.on('send_message', function(msg){
    io.sockets.emit('new_message', {
      id: socket.id,
      message: msg
    })
  });
  socket.on('name_change', function(name){
    console.log('name change ' +  name);
    var p = players[socket.id];
    p.changeName(name);
    io.sockets.emit('name_change', {
      id: socket.id,
      name: name
    })
  });
  socket.on('disconnect', function(){
    console.log('disconnect');
    delete players[socket.id];
    if (currentPlayer && currentPlayer.id == socket.id) currentPlayer = null;
    io.emit('user_leave', socket.clientId);
  });

  socket.on('roll_dice',function(){
      var diceRoll = Math.floor(Math.random() * 6) + 1;
      io.sockets.emit('dice_rolled', {
        id: socket.id,
        dice: diceRoll
      })
      players[socket.id].onDiceRoll(diceRoll);

      io.sockets.emit('move_player', {
        id: socket.id,
        tileIndex: players[socket.id].onTile
      })
  })


  socket.on('player_ready', function() {
    players[socket.id].ready = true;
    // if all ready, then game start
    io.sockets.emit('player_ready', socket.id)
    if (allPlayersReady(players)) {
      gameStart();
    }

  })

  socket.on('turn_end', function() {
    if (currentPlayer.id != socket.id) return;
    //Find the play for the next turn
    var current = null;
    var newP = null;
    for(var p in players) {
      if (current) {
        newP = players[p];
        break;
      }
      if (players[p] && players[p].id == socket.id) current = players[p]
    }
    for(var p in players) {
      if (!newP) newP = players[p];
      break;
    }

    startTurn(newP);
  })

});

function gameStart() {
  io.sockets.emit('game_start');
  startTurn(currentPlayer);
}

function allPlayersReady (players) {
  for (var p in players) {
    if (!players[p].isReady()) return false;
  }
  return true;
}


function startTurn(player)  {
  io.sockets.emit('turn_start', {
    id: player.id
  })
  currentPlayer = player;
}


http.listen(3000, function(){
  console.log('listening on *:3000');
});
