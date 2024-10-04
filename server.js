const WebSocket = require('ws');

// Use PORT provided by Replit, default to 8080 if not provided
const PORT = process.env.PORT || 8080;

// Create a new WebSocket server
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
  console.log('New client connected');

  // When the server receives a message from a client
  ws.on('message', message => {
    console.log('Received:', message);

    // Broadcast the message to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server is running on port ${PORT}`);
