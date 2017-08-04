            var socket = io();
            socket.on('connect', function() {
                console.log('connected');
                
            });
            
            socket.on('newMessage', function(message) {
                console.log('new message', message);
                var li = jQuery('<li></li>');
                li.text(`${message.from} : ${message.text}`)
                jQuery('#messages').append(li);
            });
            
            
            socket.on('disconnect', function() {
                console.log('disconnected!!!');
            });
            
            socket.on('newEmail', function(email) {
                console.log('new email', email);
            });
            
            // socket.emit('createMessage', {
            //     from:'frank',
            //     text:'hello world'
            // }, function(data){
            //     console.log('got it', data);
            // });
            
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

            