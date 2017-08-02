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
    
socket.on('disconnect', () =>{
    console.log('disconnected');
})
});



app.use(express.static(publicPath));



server.listen(port,process.env.IP, () =>{
console.log(`the server is listening ${port}`);
})