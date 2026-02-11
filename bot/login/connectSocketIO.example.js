const { io } = require('socket.io-client');

const socket = io('https://nafijpro-v2.onrender.com:3001', {
  query: {
    verifyToken: 'nafijthepro'  // must match your server config
  }
});

const channel = 'uptime';

socket.on(channel, (data) => {
  console.log('Received from server:', data);
});

socket.on('connect', () => {
  console.log('Connected to socket server successfully.');
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);
});
