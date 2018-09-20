// creates connection between client and server
var socket = io();

// connection event listener
socket.on('connect', function () {
  console.log('Connected to server');
});

// listens for a new message
socket.on('newMessage', function(message) {
  console.log('Received message', message);
});

// disconnection event listener
socket.on('disconnect', function() {
  console.log('Disconnected to server');
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function(data) {
  console.log('Got it!', data);
});

// onSubmit
$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {

  });
});
