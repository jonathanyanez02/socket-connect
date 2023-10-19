const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from directory
app.use(express.static('public'));

// API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Socket.io setup
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('chat message', (message) => {
    io.emit('chat message', message); 
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
