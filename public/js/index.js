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
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  let li = $('<li></li>');
  let link = $('<a target="_blank"">My Current Location</a>');
  li.text(`${message.from}: `);
  link.attr('href', message.url);
  li.append(link);
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

let locationButton = $('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported for your browser');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Could not fetch location');
  });

});
