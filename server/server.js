const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {


    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
    });

    socket.on('createLocationMessage', (cords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', cords.latitude, cords.longitude));
    });


    socket.on('disconnect', () => {
        console.log('User was disconnected from server');
    });
})

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})