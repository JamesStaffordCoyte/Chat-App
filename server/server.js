/* Root Node application */

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// serve this public path
const publicPath = path.join(__dirname, '/..', '/public');
const port = process.env.PORT || 3000
/* Create express app and use http to create server in order to use socketIO*/
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Register an on connection event listener
io.on('connection', (socket) => {
  console.log('new user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
});




/* Configure the public directory */
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`server is up on ${port}`);
});
