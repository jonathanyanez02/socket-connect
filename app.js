const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const Redis = require('ioredis');

// Create  Redis client
const redis = new Redis({
  host: 'clustercfg.planckdb-dev.x0slbb.memorydb.us-east-2.amazonaws.com',
  port: 6379, // default port
});

// Handle connection errors (optional)
redis.on('error', (err) => {
  console.error('Redis connection error:', err);
  
});
// Handle successful connection
redis.on('connect', () => {
  console.log('Connected to Redis');
});
// Set a value in Redis
redis.set('myKey', 'myValue', (err, reply) => {
  if (err) {
    console.error('Error setting key:', err);
  } else {
    console.log('Key set:', reply);
  }
});

// Get a value from Redis
redis.get('myKey', (err, value) => {
  if (err) {
    console.error('Error getting key:', err);
  } else {
    console.log('Value retrieved:', value);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
