const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

const clients = new Set();

server.on('connection', (ws) => {
	console.log('New client connected!');
	clients.add(ws);

	ws.on('message', (message) => {
		console.log(`Message received!: ${message}`);
		clients.forEach(client => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
	});

	ws.on('close', () => {
		console.log('Client disconnected');
		clients.delete(ws);
	});

	ws.on('error', (err) => {
		console.error('WebSocket error:', err);
	});
});

process.on('SIGINT', () => {
	console.log("\nShutting down server...");

	clients.forEach(client => client.close());
	server.close(() => {
		console.log('Server Closed!');
		process.exit(0);
	});
});

console.log('WebSocket server running on ws://localhost:3000');
