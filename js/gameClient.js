function gameClient() {
  var players = ko.observableArray(['Joe', 'Bob', 'Mike']);
  var chats = ko.observableArray();


  function GameUIViewModel(players, chats) {
    this.players = players;
    this.chats = chats;


  }

  ko.applyBindings(new GameUIViewModel(players,chats));

  for ( var i = 0; i < 100; i ++ ) {
    chats.push({
        name: 'Player' + i,
        message: 'tesasdftesasdftesasdftesasdftesasdftesasdftesasdftesasdftesasdfasdfat'
    });
  }
/*
  // connect to server
  var socket = io();



  socket.on('user_join', function(clientId) {
    if (!_.find(players, function (p){ return p === clientId})) {
      players.push(clientId);
    }
  })

  socket.on('user_leave', function(clientId) {
    players.remove(function (p) { p === clientId} )
  })

*/
}
