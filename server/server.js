const path = require('path');
const http = require('http');
const express = require('express');
const socketIO  = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


io.on('connection', (socket) => {
    console.log('new user connected');
    
    
    socket.emit('newMessage', {
        from:'Admin',
        text:'welcome to the app',
        createdAt:new Date().getTime()
    });
    
    socket.broadcast.emit('newMessage', {
        from:'Admin',
        text:'new user joined',
        createdAt:new Date().getTime()
    });
    
    socket.on('createMessage', (message) => {
        console.log('new', message);
        // io.emit('newMessage', {
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
        socket.broadcast.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime() 
        });
    });
    
    socket.emit('newMessage', {
        from:'humam@gmail.com',
        text:'hi there hello',
        createAt:232
    });
    
socket.on('disconnect', () =>{
    console.log('disconnected');
});


});



app.use(express.static(publicPath));



server.listen(port,process.env.IP, () =>{
console.log(`the server is listening ${port}`);
})