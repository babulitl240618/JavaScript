var socket = io();

/**
 * When connect event occured
 **/
socket.on('connect', function(){
  // emait the user as 'login' and send 'user_id' and 'user_fullname' which save into database
  // then update the database table field, that user is loged in by ajax calling.
  socket.emit('login', {from: user_id, text: user_fullname});

  // logout emait received from server
  socket.on("logout", function(data) {
    // console.log(data.userdata.text + ' is left.');
    $('.online_'+data.userdata.from).addClass('offline').removeClass('online');
    $('.online_'+data.userdata.from).addClass('box-default').removeClass('box-success');
  });
});

/**
 * When disconnect event occured
 **/
socket.on('disconnect', function(){
  console.log('Disconnected');
});



