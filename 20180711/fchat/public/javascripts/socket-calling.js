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

      socket.emit('call_noresponse', {
        caller_id: data.my_id,
        partner_id: data.to_id,
        user_id : user_id,
        sender_name: data.my_name,
        sender_img: data.my_img,
        msgtext: 'video',
        conversation_id : data.conversation_id,
        hangup_id: data.hangup_id,
        hangup_name : data.hangup_name,
        hangup_img : data.hangup_img

      },function(){
        
      });
  };

});

socket.on('audiocall_send', function (data) {

  var strdata=JSON.stringify(data);
  $('#modalCallAccept').attr('data-str',strdata).attr('data-type','audio');
 
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

      socket.emit('call_noresponse', {
        caller_id: data.my_id,
        partner_id: data.to_id,
        user_id : user_id,
        sender_name: data.my_name,
        sender_img: data.my_img,
        msgtext: 'audio',
        conversation_id : data.conversation_id,
        hangup_id: data.hangup_id,
        hangup_name : data.hangup_name,
        hangup_img : data.hangup_img

      },function(){

      });


  };

});

socket.on('send_noresponse', function (data) {

  if(document.getElementById("hangup")){
    window.location.href='/hayven/chat/'+'personal'+'/'+ data.hangup_id +'/'+ encodeURI(data.conversation_id) +'/'+ encodeURI(data.hangup_name) +'/' + encodeURI(data.hangup_img);
   
  }


});

socket.on('send_hangup', function (data) {

  document.getElementById('modalCallReject').click();
  
  if(document.getElementById("hangup")){
    document.getElementById('hangup').click();  
    
  }


});

socket.on('send_hangup_before', function (data) {

  //document.getElementById('modalCallReject').click();

  var obj = $('#modalCallAccept').attr('data-str');
  var data = JSON.parse(obj);

  var aud = document.getElementById("mdCallRingtone");
  aud.pause();
  aud.currentTime = 0;

  $('#myCallModal').modal('hide');

   if(document.getElementById("hangup")){
  

    window.location.href='/hayven/chat/'+'personal'+'/'+ data.partner_id +'/'+ encodeURI(data.conversation_id) +'/'+ encodeURI(data.partner_name) +'/' + encodeURI(data.partner_img);
    
  }
  

});

socket.on('send_hangup_after', function (data) {
  //alert(data.hangup_img);
  if(document.getElementById("hangup")){
    
    window.location.href='/hayven/chat/'+'personal'+'/'+ data.hangup_id +'/'+ encodeURI(data.conversation_id) +'/'+ encodeURI(data.sender_name) +'/' + encodeURI(data.sender_img);
    
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
    window.location.href='/hayven/chat/'+'personal'+'/'+ data.hangup_id +'/'+ encodeURI(data.conversation_id) +'/'+ encodeURI(data.hangup_name) +'/' + encodeURI(data.hangup_img);
    // alert('hangup');

  }else{
    // alert('hangup not found');
  }


});



function callRejectBtn(){ // receiver reject

  var obj = $('#modalCallAccept').attr('data-str');
  var data = JSON.parse(obj);

  socket.emit('call_reject', {
    caller_id: data.my_id,
    partner_id: data.to_id,

    user_id : data.my_id,
    sender_name: data.my_name,
    sender_img: data.my_img,

    msgtext: data.call_type,
    conversation_id : data.conversation_id,
    hangup_id: data.hangup_id,
    hangup_name : data.hangup_name,
    hangup_img : data.hangup_img

  },function(){

    var aud = document.getElementById("mdCallRingtone");
    aud.pause();
    aud.currentTime = 0;

    $('#myCallModal').modal('hide');

    if(document.getElementById("hangup")){
      
      window.location.href='/hayven/chat/'+'personal'+'/'+ data.hangup_id +'/'+ encodeURI(data.conversation_id) +'/'+ encodeURI(data.hangup_name) +'/' + encodeURI(data.hangup_img);
      
    }

  });

};

function callAcceptBtn(element){

  setCookie('call_status','receive',1);

  var obj = $(element).attr('data-str');
  var call_type = $(element).attr('data-type');

  var data = JSON.parse(obj);

  socket.emit('call_accept', { 
    //accept_id : data.to_id,
    caller_id: data.my_id,
    partner_id: data.to_id,
    user_id : user_id,
    sender_name: data.my_name,
    sender_img: data.my_img,
    msgtext: 'video',
    conversation_id : data.conversation_id,
    hangup_id: data.hangup_id,
    hangup_name : data.hangup_name,
    hangup_img : data.hangup_img
  });

  if(call_type=='audio'){
    window.location.href='/call/audio/'+data.to_id+'/'+data.to_name+'/'+data.to_img+'/'+data.room_genid+'/'+data.my_name+'/'+data.my_img+'/'+data.my_id+'/'+data.conversation_id;
  }else{
    window.location.href='/call/video/'+data.to_id+'/'+data.to_name+'/'+data.to_img+'/'+data.room_genid+'/'+data.my_name+'/'+data.my_img+'/'+data.my_id+'/'+data.conversation_id;
  }

}

function openAudioCall(element){
    console.log(window);
    console.log(element);
    window.location.href='/call/audio/'+room_id+'/'+room_name+'/'+room_img+'/'+conversation_id;
    setCookie('call_status','new',1);

}

function openVideoCall(element){

    window.location.href='/call/video/'+room_id+'/'+room_name+'/'+room_img+'/'+conversation_id;
    setCookie('call_status','new',1);
}

function callbackAudioVideo(element){
    var calltype = $(element).attr('data-calltype');
    if(calltype=='audio'){
        $('.audio-call').click();
    }else{
        $('.video-call').click();
    }

}