module.exports = function(io) {
  var app = require('express');
  var router = app.Router();
  var {generateMessage, sendNewMsg, sendCallMsg , sendBusyMsg} = require('./../utils/message');
  var {saveConversation, findConversationHistory, createGroup} = require('./../utils/conversation');

  io.on('connection', function(socket){
    socket.join('1');
    socket.join('2');
    socket.on('login', function(userdata){
      socket.join('navigate_2018_902770');
      socket.join(userdata.from);
    
      socket.handshake.session.userdata = userdata;
      socket.handshake.session.save();

      if(alluserlist.indexOf(userdata.from) != -1){
        console.log("socket js line 13");
      }else{
        alluserlist.push(userdata.from);        
      }
      // console.log(alluserlist);
      // var room = io.sockets.adapter.rooms['navigate_2018_902770'];
      // room.length
      socket.emit('online_user_list', generateMessage('Admin', alluserlist)); // this emit receive only who is login
      socket.broadcast.emit('new_user_notification', generateMessage('Admin', socket.handshake.session.userdata)); // this emit receive all users except me
    });

    socket.on('sendMessage', function(message, callback) {
      // var touser = message.to;
      if(message.is_room === false){
        sendNewMsg(socket.handshake.session.userdata.from, message.sender_img, message.sender_name, message.conversation_id, message.text, (result, err) =>{
          if(err){
            console.log(err);
          } else {
            if(result.status) {
              io.to(message.to).emit('newMessage', {msg_id: result.res, msg_from: socket.handshake.session.userdata.from, msg_text: message.text, msg_sender_name: message.sender_name, msg_sender_img: message.sender_img, msg_attach_files: message.attach_files, msg_conv_id: message.conversation_id});
              // console.log('socketjs 38', result);
              callback(result);
            } else {
              console.log(result);
            }
          }
        });
      }
      else if(message.is_room === true) {
        // console.log('something wrong!!!');
        // io.to('navigate_2018_902770').emit('newMessage', generateMessage(socket.handshake.session.userdata.from, message.text, msg_sender_name: message.sender_name, msg_sender_img: message.sender_img));
        // This is temporary group message.
        sendNewMsg(socket.handshake.session.userdata.from, message.sender_img, message.sender_name, message.conversation_id, message.text, (result, err) =>{
          if(err){
            console.log(err);
          } else {
            if(result.status) {
              socket.broadcast.emit('newMessage', {msg_id: result.res, msg_from: message.to, msg_text: message.text, msg_sender_name: message.sender_name, msg_sender_img: message.sender_img, msg_attach_files: message.attach_files, msg_conv_id: message.conversation_id}); // this emit receive all users except me
              // io.to(message.conversation_id).emit('newMessage', {msg_id: result.res, msg_from: message.to, msg_text: message.text, msg_sender_name: message.sender_name, msg_sender_img: message.sender_img, msg_attach_files: message.attach_files, msg_conv_id: message.conversation_id}); // this emit receive all users except me
              // console.log({msg_id: result.res, msg_from: message.to, msg_text: message.text, msg_sender_name: message.sender_name, msg_sender_img: message.sender_img, msg_attach_files: message.attach_files, msg_conv_id: message.conversation_id});
              callback(result);
            } else {
              console.log(result);
            }
          }
        });
      }
    });
	
	
  	socket.on('addNewMeberToGroup',function(message, callback){
  	  io.to(message.userID).emit('popUpgroupblock', {
  		senderName: message.senderName, 
  		userID: message.userID, 
  		userName: message.userName, 
  		userImg: message.userImg, 
  		cnvID: message.cnvID, 
  		desig: message.desig,
  		groupName: message.groupName
  	  });
  	});

    socket.on('groupCreateBrdcst', function(message, callback) {

      var str = message.memberList;
      var strUUID = message.memberListUUID;
      var adminList = message.adminList;
      var adminListUUID = message.adminListUUID;
      var memberlist = str.concat(adminList);
      var memberlistUUID = strUUID.concat(adminListUUID);
      var joinMenber = memberlist.join(',');
      if(message.teamname !== ""){
        createGroup(adminListUUID,memberlistUUID,message.teamname,message.createdby,message.selectecosystem,message.grpprivacy,(result, err) =>{
          if(err){
            console.log(err);
          } else {
            if(result.status) {
              socket.broadcast.emit('groupCreate', {
                room_id: result,
                memberList: strUUID,
                adminList: adminListUUID,
                selectecosystem: message.selectecosystem,
                teamname: message.teamname,
                grpprivacy: message.grpprivacy
              });
            } else {
              console.log(result);
            }
          }
        });
      }
    });

    socket.on('typing', function(message) {
      console.log('line 112= room_id= ', message.room_id);
      console.log('line 113= room_id= ', message.sender_id);
      // console.log('line 80= img ', message.sender_img);
      io.to(message.room_id).emit('typing', {display: message.display, room_id: message.room_id, sender_id: message.sender_id, img: message.sender_img, name: message.sender_name});
      // socket.broadcast.emit('typingBroadcast', {display: message.display, msgsenderroom: message.sendto, img: message.sender_img, name: message.sender_name});
    });

    socket.on('emoji_emit', function(data) {
      console.log(data);
      io.to(data.room_id).emit('emoji_on_emit', {room_id: data.room_id, msg_id: data.msgid, emoji_name: data.emoji_name, count: data.count });
    });

    socket.on('group_join', function(group){
      socket.join(group.group_id);
      console.log(122, group.group_id);
      console.log(123, io.sockets.adapter.rooms);
    });

    socket.on('disconnect', function(){
      io.sockets.in('navigate_2018_902770').emit('logout', { userdata: socket.handshake.session.userdata });
      alluserlist = alluserlist.filter(function(el){
        // console.log('socket 74', alluserlist);
        //console.log('socket 75', socket.handshake.session.userdata.from);
        // if(socket.handshake.session.userdata.from == undefined)
          // return false;
        return el !== socket.handshake.session.userdata.from;
      });
      if(socket.handshake.session.userdata){
        delete socket.handshake.session.userdata;
        socket.handshake.session.save();
      }
    });

    socket.on('videocall_req', function (data) {

      if(data.to_id){
        sendBusyMsg({ user_id : data.my_id , is_busy:1 }, (result) =>{
          if(result.status){

            sendBusyMsg({ user_id : data.to_id , is_busy:1 }, (result) =>{
              if(result.status){

               io.to(data.to_id).emit('videocall_send', data);
             }
           });


          }
        });

      }

    });

    socket.on('audiocall_req', function (data) {

      if(data.to_id){
        sendBusyMsg({ user_id : data.my_id , is_busy:1 }, (result) =>{
          if(result.status){

            sendBusyMsg({ user_id : data.to_id , is_busy:1 }, (result) =>{
              if(result.status){

               io.to(data.to_id).emit('audiocall_send', data);
             }
           });


          }
        });

      }

    });

    socket.on('call_hangup', function (data) {

      if(data.hangup_id){
        sendBusyMsg({user_id:data.partner_id,is_busy:0}, (result) =>{
          if(result.status){
            io.to(data.hangup_id).emit('send_hangup', data);   
          }
        });


      }

    });

    socket.on('call_hangup_before', function (data,callback) {

      if(data.hangup_id){

        sendBusyMsg({user_id: data.partner_id, is_busy: 0}, (result1) =>{
          if(result1.status){
            sendBusyMsg({user_id: data.caller_id, is_busy: 0}, (result2) =>{
              if(result2.status){
                sendCallMsg(data.user_id, data.sender_img, data.sender_name, data.conversation_id, data.msgtext,'call', (result3, err) =>{
                  if(err){
                    console.log(err);
                  } else {
                    if(result3.status) {
                      io.to(data.hangup_id).emit('send_hangup_before', data);  
                      callback(result3.status);
                    } else {
                      console.log(result3);
                    }
                  }
                });

              }
            });

          }
        });
      }

    });

    socket.on('call_hangup_after', function (data,callback) {

      if(data.hangup_id){

        sendBusyMsg({user_id: data.partner_id, is_busy: 0}, (result1) =>{
          if(result1.status){
            sendBusyMsg({user_id: data.caller_id, is_busy: 0}, (result2) =>{
              if(result2.status){
                sendCallMsg(data.user_id, data.sender_img, data.sender_name, data.conversation_id, data.msgtext, 'called', (result3, err) =>{
                  if(err){
                    console.log(err);
                  } else {
                    if(result3.status) {
                      io.to(data.hangup_id).emit('send_hangup_after', data);  
                      callback(result3.status);
                    } else {
                      console.log(result3);
                    }
                  }
                });

              }
            });

          }
        });
      }

    });

    socket.on('call_reject', function (data,callback) {

      if(data.caller_id){
        sendBusyMsg({user_id: data.partner_id, is_busy: 0}, (result1) =>{
          if(result1.status){
            sendBusyMsg({user_id: data.caller_id, is_busy: 0}, (result2) =>{
              if(result2.status){
                sendCallMsg(data.user_id, data.sender_img, data.sender_name, data.conversation_id, data.msgtext,'call', (result3, err) =>{
                  if(err){
                    console.log(err);
                  } else {
                    if(result3.status) {
                      io.to(data.caller_id).emit('send_reject', data);
                      callback(result3.status);
                    } else {
                      console.log(result3);
                    }
                  }
                });

              }
            });

          }
        });


      }

    });

    socket.on('call_noresponse', function (data,callback) {
     if(data.caller_id){
      sendBusyMsg({user_id: data.partner_id, is_busy: 0}, (result1) =>{
        if(result1.status){
          sendBusyMsg({user_id: data.caller_id, is_busy: 0}, (result2) =>{
            if(result2.status){
              sendCallMsg(data.user_id, data.sender_img, data.sender_name, data.conversation_id, data.msgtext,'call', (result3, err) =>{
                if(err){
                  console.log(err);
                } else {
                  if(result3.status) {
                    io.to(data.caller_id).emit('send_noresponse', data);
                    callback(result3.status);
                  } else {
                    console.log(result3);
                  }
                }
              });

            }
          });

        }
      });

     }

    });

    socket.on('call_accept', function (data) {

      if(data.partner_id){

        sendBusyMsg({user_id: data.partner_id, is_busy: 0}, (result1) =>{
          if(result1.status){
            sendBusyMsg({user_id: data.caller_id, is_busy: 0}, (result2) =>{
              if(result2.status){
                io.to(data.partner_id).emit('send_accept', data);  

              }
            });

          }
        });


      }

    });

    socket.on('userbusy_dbup', function (data, fn) {
     sendBusyMsg(data, (result) =>{
       fn(result.status);
     });

   });

  });

  return router;
}
