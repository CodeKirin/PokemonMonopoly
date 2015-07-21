var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');



var players = {};

io.on('connection', function(socket){

  io.emit('user_join', socket.clientId);
  players[socket.clientId] = {};


  socket.on('chat message', function(msg){
  });


  socket.on('disconnect', function(){
    players[socket.clientId] = null;
    io.emit('user_leave', socket.clientId);
  });




});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
