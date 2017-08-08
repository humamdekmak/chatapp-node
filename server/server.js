const path = require('path');
const http = require('http');
const express = require('express');
const socketIO  = require('socket.io');
const generateMessage = require('./../utils/message');
const generateLocationMessage = require('./../utils/message2');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


io.on('connection', (socket) => {
    console.log('new user connected');
    
    
    socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat app'));
    
    socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));
    
    socket.on('createMessage', (message, callback) => {
        console.log('new', message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();
        
    });
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    
    // socket.emit('newMessage', {
    //     from:'humam@gmail.com',
    //     text:'hi there hello',
    //     createAt:232
    // });
    
socket.on('disconnect', () =>{
    console.log('disconnected');
});


});



app.use(express.static(publicPath));



server.listen(port,process.env.IP, () =>{
console.log(`the server is listening ${port}`);
})