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
  let messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

let locationButton = $('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported for your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Could not fetch location');
  });

});
