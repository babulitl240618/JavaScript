var socket = io();
var all_current_sms = [];
$('#to').val("");

/**
 * Scroll to bottom
 **/
function scrollToBottom() {
  var message = jQuery('#messages');
  var scrollHeight = message.prop('scrollHeight');
  message.scrollTop(scrollHeight);
}

/**
 * draw a html for message
 **/
function draw_message(username, msg, time){
  var html = "";
  html += '<li class="message">';
  html +=   '<div class="message__title">';
  html +=     '<h4>'+ username +'</h4>';
  html +=     '<span>'+ moment(time).calendar() +'</span>';
  html +=   '</div>';
  html +=   '<div class="message__body">';
  html +=     '<p>'+ msg +'</p>';
  html +=   '</div>';
  html += '</li>';
  return html;
}


/**
 * When connect event occured
 **/
socket.on('connect', function(){
  // emait the user as 'login' and send 'userid' and 'username' which save into database
  // then update the database table field, that user is loged in by ajax calling.
  socket.emit('login', {from: userid, text: username});

  // logout emait received from server
  socket.on("logout", function(data) {
    // console.log(data.userdata.text + ' is left.');
    $('.online_'+data.userdata.from).addClass('offline').removeClass('online');
  });
});

/**
 * When disconnect event occured
 **/
socket.on('disconnect', function(){
  console.log('Disconnected');
});

/**
 * after login,
 * receive a welcome message, handled by socket.
 **/
socket.on('online_user_list', function(message){
  $.each(message.text, function(k,v){
    $('.online_'+v).addClass('online').removeClass('offline');
  });
});

/**
 * When a new user login,
 * broadcast to other user, that someone joined.
 * and user list marked as online
 **/
socket.on('new_user_notification', function(notification){
  // console.log(notification.text.text + ' is joined');
  $('.online_'+notification.text.from).addClass('online').removeClass('offline');
});

/**
 * When a new message come,
 * Check user message container is opne or not.
 * if open, it show's the message in the container
 * else marked as a notification that new message arived
 **/
socket.on('newMessage', function(message) {
  // console.log(message);
  if($('#to').val() == message.msg_from){
    $('.typing-indicator').hide();
    var html = draw_message($('.online_' + message.msg_from).attr('data-name'), message.msg_text, moment());
    $('#messages').append(html);
    scrollToBottom();
  } else {
    var nomsg = parseInt($('.online_' + message.msg_from + ' .nomsg').text())?parseInt($('.online_' + message.msg_from + ' .nomsg').text()):0;
    $('.online_' + message.msg_from + ' .nomsg').text(nomsg + 1);
  }
});

/**
 * Receive typing event and
 * display indicator images hide and show
 **/
socket.on('typing', function(type){
  $('.typing-indicator').css('display', type);
});

/**
 * When click on the user Name
 **/
$('.userlist').on('click', function() {
  $('#to').val("");
  var fid = $(this).attr('data-id');
  var user_display_name = $(this).attr('data-name');
  $('#display_name').text(user_display_name);
  $('#to').val(fid);
  $.ajax({
    url: "/chat/msg_history",
    type: "POST",
    data: {mid: userid, fid: fid},
    dataType: "JSON",
    success: function(res){
      if(res.length>0){
        var html = '';
        var newres = _.sortBy(res, ['msg_createdat']);
        $.each(newres, function(k,v){
          if((v.msg_from === userid && v.msg_to === fid) || (v.msg_from === fid && v.msg_to === userid)){
            var un = $('.online_'+v.msg_from).attr('data-name');
            html += draw_message(un, v.msg_text, v.msg_createdat);
          }
        });
        $('#messages').html(html);
        scrollToBottom();
      } else {
        $('#messages').html("");
      }
    },
    error: function(err){
      console.log(err.responseText);
    }
  });
  $('#msg').attr('disabled', false).focus();
  $('.chat__footer button').attr('disabled', false);
});

/**
 * When message from submit
 **/
$(".message-form").on('submit', function(e){
  e.preventDefault();

  var messageTextbox = $('#msg');
  var to = $('#to').val();
  var msg = messageTextbox.val();
  if(msg != ""){
    socket.emit('sendMessage', {to: to, is_room: false, text: msg }, function() {
      var html = draw_message(username, msg, moment());
      $('#messages').append(html);
      scrollToBottom();
      messageTextbox.val('');
    });
  }
});

/**
 * Global typing variable, for storing typing status
 * Global timeout variable, for storing when typing timeout
 **/
var typing = false;
var timeout = undefined;
/**
 * timeoutFunction call after 2 second typing start
 **/
function timeoutFunction() {
  typing = false;
  socket.emit("typing", { display: 'none', sendto: $('#to').val() });
  // console.log('timeout emit' + moment().format('m-s'));
}
/**
* When typing start into message box
**/
$('#msg').keyup(function () {
  if(typing === false){
    typing = true;
    socket.emit('typing', { display: 'block', sendto: $('#to').val() });
    // console.log('typing emit' + moment().format('m-s'));
    timeout = setTimeout(timeoutFunction, 2000);
  }
});
