const WebSocket = require('ws');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
	console.log('Connected to server!');

	rl.setPrompt('Enter message: ');
	rl.prompt();

	rl.on('line', (message) => {
		ws.send(message);
		rl.prompt();
	});
});

ws.on('message', (message) => {
	console.log(`\nReceived: ${message}`);
	rl.prompt();
});

ws.on('close', () => {
	console.log('Disconnected from server.');
	process.exit(0);
});

ws.on('error', (err) => {
	console.error('WebSocket error:', err);
});