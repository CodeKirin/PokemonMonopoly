var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');



var players = {};

io.on('connection', function(socket){
console.log(socket.id);
  io.emit('user_join', socket.id);
  players[socket.id] = null;

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
    players[socket.id] = name;

    io.sockets.emit('name_change', {
      id: socket.id,
      name: name
    })
  });
  socket.on('disconnect', function(){
    console.log('disconnect');
    delete players[socket.id];
    io.emit('user_leave', socket.clientId);
  });

  socket.on('roll_dice',function(){
      var diceRoll = Math.floor(Math.random() * 6) + 1;
      io.sockets.emit('dice_rolled', {
        id: socket.id,
        dice: diceRoll
      })
  })



});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
