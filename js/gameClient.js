function gameClient() {


  function GameUIViewModel() {
    var scope = this;
    scope.players = ko.observable({});
    scope.chats = ko.observableArray();
    scope.nameModalOpen = ko.observable(false);
    scope.playerName = ko.observable();
    scope.nameDialog = ko.observable();
    scope.loading = ko.observable(true);

    scope.playersArray = ko.computed(function() {
        return _.values(scope.players());
    });

    // connect to server
    var socket = io('localhost:3000');


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
      scope.players(data);
    })
    socket.on('new_message', function(data) {
      var p = scope.players() ;
      scope.chats.push({
        name: p[data.id],
        message: data.message,
        isSelf: socket.id == data.id
      })
      //
      var elem = document.getElementById('chats');
      elem.scrollTop = elem.scrollHeight;
    })
    socket.on('name_change', function (data) {
      var p = scope.players();
      p[data.id] = data.name;
      scope.players(p);
    })
    socket.on('user_join', function(clientId) {
      var p = scope.players() ;
      p[clientId] = "new";
      scope.players(p);
    })
    socket.on('user_leave', function(clientId) {
      var p = scope.players();
      p[clientId] = null;
      scope.players(p);
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
