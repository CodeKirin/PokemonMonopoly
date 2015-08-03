function gameClient() {


  function GameUIViewModel() {
    var scope = this;
    scope.players = ko.observable({});
    scope.chats = ko.observableArray();
    scope.nameModalOpen = ko.observable(false);
    scope.playerName = ko.observable();
    scope.nameDialog = ko.observable();
    scope.loading = ko.observable(false);
    scope.canRoll = ko.observable(true);
    scope.playersArray = ko.observableArray();
    scope.isMyTurn = ko.observable(false);

    scope.players.subscribe(function(players) {
      // Remove player that left
      scope.playersArray.remove(function(item) {
        return !players[item.id];
      })
      // Add new players
      for (var key in players) {
          if (!_.find(scope.playersArray(), function(i) { return i.id == key})) {
            var t = _.clone(players[key]);
            t.name = ko.observable(t.name);
            scope.playersArray.push(t);
          } else {
            var p = _.find(scope.playersArray(), function(i) { return i.id == key});
            p.name(players[key].name);
          }
      }
    });
    //center it if it is opened
    scope.nameModalOpen.subscribe(function(newValue) {
      scope.nameDialog().center();
    });

    // DICE
  	// TODO: replace with server rolled number
  	var dice = new Dice();
  	$("#roll-button").click(function() {
      if (scope.canRoll())
  		  socket.emit('roll_dice');
      scope.canRoll(false);
    })
    $('#turn-button').click(function() {
      socket.emit('turn_end');
      scope.isMyTurn(false);
    })
    // connect to server
    window.socket = io('192.168.3.100:3000');
    var peer;
    var userMediaPromise = Q.defer();

    // Server sends connected message to me
    socket.on('connected', function (id) {
      // Remove loading screen
      scope.loading(false);
      // Prompt for name
      scope.nameModalOpen(true);
      socket.id = id;
      peer = new Peer(socket.id, {host: '192.168.3.100', port: '3030' });

      peer.on('call', function(call) {
          call.answer(myStream);
          call.on('stream', function(remoteStream) {
            var video = $("#" + call.peer + " video")[0];
            video.src = window.URL.createObjectURL(remoteStream);
          });
      });




    $(document).keypress(function(e) {
      // Press enter to send a message
      if(e.which == 13) {
        var chatElement = $('#chat');
        var message = chatElement.val();
        if (message) socket.emit('send_message', message)

        chatElement.val(null);
        chatElement.focus();
        e.preventDefault();
      }
    });
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({video: true, audio: true}, function(stream) {
      window.myStream = stream;
      socket.emit('media_ready', socket.id);
      userMediaPromise.resolve();
      var video = $("#" + socket.id + " video")[0];
      video.src = window.URL.createObjectURL(myStream);
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    })

  })



  scope.playerName.subscribe(function(name) {
      scope.nameModalOpen(false);
      socket.emit('name_change', name);
  })
  socket.on('init', function (data) {
    // Create missing players

    var p = scope.players();
    for (var k in data) {
      if (p[k] == null) {
        p[k] = {
          id: k,
          name: data[k].name,
          ready: false,
          balance: data[k].balance,
          player: new Pikachu()
        };
      }
    }
    scope.players(p);
  })
  socket.on('new_message', function(data) {
    var p = scope.players() ;
    scope.chats.push({
      name: p[data.id].name,
      message: data.message,
      isSelf: socket.id == data.id
    })
    //
    var elem = document.getElementById('chats');
    elem.scrollTop = elem.scrollHeight;
  })
  socket.on('name_change', function (data) {
    var p = scope.players();
    if (!p[data.id]) p[data.id] = {};
    p[data.id].name = data.name;
    scope.players(p);
  })
  socket.on('user_join', function(clientId) {
    if(clientId == socket.id) return;
    var p = scope.players() ;
    p[clientId] = {
      id: clientId,
      name: "",
      ready: false,
      balance: 0,
      player: new Pikachu()
    };
    scope.players(p);
  })
  socket.on('user_leave', function (clientId) {
      var p = scope.players();
      delete p[clientId];
      scope.players(p);
  });
  socket.on('media_ready', function(clientId) {
    if (clientId != socket.id) {
      var call = peer.call(clientId, myStream);
      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
        var video = $("#" + clientId + " video")[0];
        video.src = window.URL.createObjectURL(remoteStream);
      });
    } else {
      userMediaPromise.promise.then(function() {
        var video = $("#" + clientId + " video")[0];
        video.src = window.URL.createObjectURL(myStream);
      })
    }
  })
  socket.on('player_ready', function(clientId) {
    var p = scope.players();
    p[clientId].ready = true;
    scope.players(p);
    p[clientId].player.addToStage(stage);
    p[clientId].player.moveTo(gameBoard.getAllBoardTiles()[0]);

    //
  })
  socket.on('move_player', function (data){
          var p = scope.players();
    p[data.id].player.moveTo(gameBoard.getAllBoardTiles()[data.tileIndex]);
  })
  socket.on('game_start',function(){
    var text = new PIXI.Text("Game Start", {font:"50px Arial", fill:"red"});
    stage.addChild(text);


    var tween = new TWEEN.Tween( { opacity: 1 } )
      .to( {opacity: 0}, 1000 ) // TODO: Move position calculation logic into Tile
      //.easing( TWEEN.Easing.Elastic.InOut )
      .onUpdate( function () {
        text.alpha = this.opacity;
      })
      .start();


  })
  socket.on('turn_start',function(data) {
    if (data.id == socket.id) {
      scope.isMyTurn(true);
      scope.canRoll(true);
      var text = new PIXI.Text("YOUR TURN", {font:"50px Arial", fill:"red"});
      stage.addChild(text);


      var tween = new TWEEN.Tween( { opacity: 1 } )
        .to( {opacity: 0}, 1000 ) // TODO: Move position calculation logic into Tile
        //.easing( TWEEN.Easing.Elastic.InOut )
        .onUpdate( function () {
          text.alpha = this.opacity;
        })
        .start();

    }
  })







  }
  ko.applyBindings(new GameUIViewModel());
}
