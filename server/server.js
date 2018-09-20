/* Root Node application */
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js')
// serve this public path
const publicPath = path.join(__dirname, '/..', '/public');
const port = process.env.PORT || 3000
/* Create express app and use http to create server in order to use socketIO*/
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

/* Configure the public directory */
app.use(express.static(publicPath));
// Register an on connection event listener
io.on('connection', (socket) => {
  console.log('new user connected');

  // Welcomes new user as soon as they connect
  socket.emit('newMessage', generateMessage("Admin", "Welcome to the Chat App"));

  // Broadcast to everyone that a new user has joined the chat room
  socket.broadcast.emit('newMessage', generateMessage("Admin", "New User has joined"));



  // listens for a created message
  socket.on('createMessage', (message, callback) => {
    console.log('created message', message);
    // emits event to all connections
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');

  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
});






server.listen(port, () => {
  console.log(`server is up on ${port}`);
});
