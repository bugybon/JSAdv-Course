const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = new Map();
const queue = [];

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/home.html');
});

app.get('/chat',(req, res) =>{
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    console.log('Client connected');
    
    // setInterval(() => {
    //     socket.emit('server-time', new Date().toISOString());
    // }, 1000);
    
    socket.on('name-message', (msg) =>{
        users.set(socket.id, msg);
        console.log(socket.id);
        socket.emit('redirect', '/chat');
        queue.push(socket.id);
    });

    socket.on('joined-chat', () => {
        oldId = queue.shift();
        console.log(oldId);
        users.set(socket.id, users.get(oldId));
        users.delete(oldId);
    });

    // Handle echo messages
    socket.on('echo-message', (msg) => {
        socket.emit('echo-response', users[msg]+`${users[socket.id]}`);
    });
    
    // Cleanup on disconnect
    socket.on('disconnect', () => {
        // clearInterval(intervalId);
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});