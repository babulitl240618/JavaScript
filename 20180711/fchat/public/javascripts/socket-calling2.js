socket.on('videocall_send', function (data) {

  var strdata=JSON.stringify(data);
  $('#modalCallAccept').attr('data-str',strdata).attr('data-type','video');
  
  var calltxt=data.my_name;
  
  $('#modalCallMsg').text(calltxt);
  $('#calling_userimg').attr('src',"/images/users/"+data.my_img);
  $("#myCallModal").modal({backdrop: 'static', keyboard: false});
  
  var aud = document.getElementById("mdCallRingtone");
  aud.play();
  aud.onended = function() {
      $('#myCallModal').modal('hide');

      var obj = $('#modalCallAccept').attr('data-str');
      var data = JSON.parse(obj);

      console.log('call_noresponse',data);
      socket.emit('call_noresponse', {
        caller_id: data.my_id ,
        sender_name: data.my_name,
        sender_img: data.my_img,
        msgtext: 'video',
        conversation_id : data.conversation_id

      });
  };

});

socket.on('audiocall_send', function (data) {

  var strdata=JSON.stringify(data);
  $('#modalCallAccept').attr('data-str',strdata).attr('data-type','audio');
 
  //var calltxt = data.my_name + " is audio calling you. Do you want to accept?";
  var calltxt = data.my_name;
  
  $('#modalCallMsg').text(calltxt);
  $('#calling_userimg').attr('src',"/images/users/"+data.my_img);
  $("#myCallModal").modal({backdrop: 'static', keyboard: false});
  
  var aud = document.getElementById("mdCallRingtone");
  aud.play();

  aud.onended = function() {
      $('#myCallModal').modal('hide'); // undo

      var obj = $('#modalCallAccept').attr('data-str');
      var data = JSON.parse(obj);

      console.log('call_noresponse',data);
      socket.emit('call_noresponse', {
        caller_id: data.my_id ,
        sender_name: data.my_name,
        sender_img: data.my_img,
        msgtext: 'audio',
        conversation_id : data.conversation_id

      });


  };

});

socket.on('send_noresponse', function (data) {
  if(document.getElementById("hangup")){
    document.getElementById('hangup').click();  // undo
   
  }


});

socket.on('send_hangup', function (data) {

  document.getElementById('modalCallReject').click();
  
  if(document.getElementById("hangup")){
    document.getElementById('hangup').click();  
    
  }


});

socket.on('send_accept', function (data) {
  //alert(data);

  $('#myCallModal').modal('hide');

  var aud = document.getElementById("mdCallRingtone");
  aud.pause();
  aud.currentTime = 0;
  
});

socket.on('send_errmsg', function (data) {
  alert(data);
  
});

socket.on('send_reject', function (data) {

  if(document.getElementById("hangup")){
   // document.getElementById('hangup').click(); 
    window.location.href = '/hayven/chat/' + data.hangup_id + '/' + encodeURI(data.hangup_name) + '/' + encodeURI(data.hangup_img); 
    // alert('hangup');

  }else{
    // alert('hangup not found');
  }


});



function callRejectBtn(){

  var obj = $('#modalCallAccept').attr('data-str');
  var data = JSON.parse(obj);

  socket.emit('call_reject', {
    caller_id: data.my_id , 
    user_id : user_id,
    sender_name: data.my_name,
    sender_img: data.my_img,
    msgtext: data.call_type,
    conversation_id : data.conversation_id,
    hangup_id: data.hangup_id,
    hangup_name : data.hangup_name,
    hangup_img : data.hangup_img

  });

  var aud = document.getElementById("mdCallRingtone");
  aud.pause();
  aud.currentTime = 0;

  $('#myCallModal').modal('hide');

  
};

function callAcceptBtn(element){

  setCookie('call_status','receive',1);
  var obj = $(element).attr('data-str');
  var call_type = $(element).attr('data-type');

  var data = JSON.parse(obj);

  socket.emit('call_accept', { accept_id : data.to_id });

  if(call_type=='audio'){
    window.location.href='/call/audio/'+data.to_id+'/'+data.to_name+'/'+data.to_img+'/'+data.room_genid+'/'+data.my_name+'/'+data.my_img+'/'+data.my_id+'/'+data.conversation_id;
  }else{
    window.location.href='/call/video/'+data.to_id+'/'+data.to_name+'/'+data.to_img+'/'+data.room_genid+'/'+data.my_name+'/'+data.my_img+'/'+data.my_id+'/'+data.conversation_id;
  }

}

function openAudioCall(element){
    window.location.href='/call/audio/<%= data[0].room_id %>/<%= data[0].room_name %>/<%= data[0].room_img %>/';
    setCookie('call_status','new',1);

}

function openVideoCall(element){

    window.location.href='/call/video/<%= data[0].room_id %>/<%= data[0].room_name %>/<%= data[0].room_img %>/';setCookie('call_status','new',1);
}

function callbackAudioVideo(element){
    var calltype = $(element).attr('data-calltype');
    if(calltype=='audio'){
        $('.audio-call').click();
    }else{
        $('.video-call').click();
    }

}