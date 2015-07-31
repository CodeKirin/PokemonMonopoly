function gameClient() {


  function GameUIViewModel() {
    var scope = this;
    scope.players = ko.observable({});
    scope.chats = ko.observableArray();
    scope.nameModalOpen = ko.observable(false);
    scope.playerName = ko.observable();
    scope.nameDialog = ko.observable();
    scope.loading = ko.observable(true);
    scope.canRoll = ko.observable(true);
    scope.playersArray = ko.observableArray();

    scope.isMyTurn = ko.observable(false);

    scope.players.subscribe(function(players) {
      //TODO: better way to do this?
      scope.playersArray.removeAll();
      for (var key in players) {
          scope.playersArray.push(players[key]);
      }
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
    window.socket = io('localhost:3000');

    // Server sends connected message to me
    socket.on('connected', function () {
      // Remove loading screen
      scope.loading(false);
      // Prompt for name
      scope.nameModalOpen(true);
    })

    //center it if it is opened
    scope.nameModalOpen.subscribe(function(newValue) {
      scope.nameDialog().center();
    });

    scope.playerName.subscribe(function(name) {
        scope.nameModalOpen(false);
        socket.emit('name_change', name);
    })
    socket.on('init', function (data) {
      var p = scope.players();
      // Create missing players
      for (var k in data) {
        if (p[k] == null) {
          var p = scope.players() ;
          p[k] = {
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


      var p = scope.players() ;
      p[clientId] = {
        ready: false,
        balance: 0,
        player: new Pikachu()
      };
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


  }


  ko.applyBindings(new GameUIViewModel());

}
