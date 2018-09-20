// creates connection between client and server
var socket = io();

// connection event listener
socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    to: 'otherUser',
    text: 'newText'
  });

});



// disconnection event listener
socket.on('disconnect', function() {
  console.log('Disconnected to server');
});

socket.on('newMessage', function(message) {
  console.log('Received message', message);
});
