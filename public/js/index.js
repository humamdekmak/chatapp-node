function scrollToDown() {
  // selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  
  // height
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  
  
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
  
}


            var socket = io();
            socket.on('connect', function() {
                console.log('connected');
                
            });
            
            socket.on('newMessage', function(message) {
                var formatedTime = moment(message.createdAt).format('h:mm a');
                console.log('new message', message);
                var li = jQuery('<li></li>');
                li.text(`${message.from} ${formatedTime}: ${message.text}`);
                jQuery('#messages').append(li);
                scrollToDown();
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
            
            socket.on('newLocationMessage', function(message) {
                var formatedTime = moment(message.createdAt).format('h:mm a');
                var li = jQuery('<li></li>');
                var a = jQuery('<a target="_blank">My current Location</a>')
                li.text(`${message.from} ${formatedTime}:`);
                a.attr('href', message.url);
                li.append(a);
                jQuery('#messages').append(li);
                scrollToDown();
            });
            
            


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
        messageTextbox.val('');
  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  
  locationButton.attr('disabled', 'disabled').text('Sending location..')

  navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function () {
     locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});




            