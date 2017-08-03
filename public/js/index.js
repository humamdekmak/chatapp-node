            var socket = io();
            socket.on('connect', function() {
                console.log('connected');
                
            socket.emit('createMessage', {
                to:'fafa@gmail.com',
                text:'hey  heye ey'
            });
                
            });
            
            socket.on('newMessage', function(message) {
                console.log('new message', message);
            });
            
            
            socket.on('disconnect', function() {
                console.log('disconnected!!!');
            });
            
            socket.on('newEmail', function(email) {
                console.log('new email', email);
            });