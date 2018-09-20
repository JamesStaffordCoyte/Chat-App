// creates connection between client and server
var socket = io();

// connection event listener
socket.on('connect', function () {
  console.log('Connected to server');
});

// listens for a new message
socket.on('newMessage', function(message) {
  let li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  console.log(li);
  $('#messages').append(li);
});

// disconnection event listener
socket.on('disconnect', function() {
  console.log('Disconnected to server');
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
