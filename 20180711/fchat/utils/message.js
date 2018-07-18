var app = require('express');
var _ = require('lodash');
var router = app.Router();

var {models} = require('./../config/db/express-cassandra');

var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length >0;
}

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var sendNewMsg = (from, sender_img, sender_name, conversation_id, msg, callback) => {
  var createdat = new Date().getTime();
  var msgid = models.timeuuid();
  if(isRealString(msg)){
    uuidconversation_id = models.uuidFromString(conversation_id);
    uuidfrom = models.uuidFromString(from);
    var message = new models.instance.Messages({
        msg_id: msgid,
        msg_body: msg,
        sender: uuidfrom,
        sender_name: sender_name,
        sender_img: sender_img,
        conversation_id: uuidconversation_id
    });

    message.saveAsync()
        .then(function(res) {
            callback({status:true, res: msgid});
        })
        .catch(function(err) {
            callback({status:false, err: err});
        });
  } else {
    callback({status:false, err: 'Message formate not supported.'});
  }
};


var add_reac_emoji = (msg_id, user_id, user_fullname, emoji, callback) =>{
  var c_grinning = 0; var c_joy = 0; var c_open_mouth = 0; var c_disappointed_relieved = 0;
  var c_rage = 0; var c_thumbsup = 0; var c_thumbsdown = 0; var c_heart = 0;

  models.instance.Messages.find({msg_id: models.timeuuidFromString(msg_id)}, {raw:true, allow_filtering: true}, function(err, message){
    if(err){
      console.log(error);
    }else{
      var messageEmoji = new models.instance.MessageEmoji({
        msg_id: models.timeuuidFromString(msg_id), 
        user_id: models.uuidFromString(user_id),
        user_fullname: user_fullname,
        emoji_name: emoji
      });
      messageEmoji.saveAsync().then(function() {
        console.log('Ok');
      }).catch(function(err) {
        console.log(err);
      });
      _.forEach(message[0].has_emoji, function(v,k){
        switch(k) {
          case "grinning":
            v += (k==emoji)?1:0; c_grinning += v; break;
          case "joy":
            v += (k==emoji)?1:0; c_joy += v; break;
          case "open_mouth":
            v += (k==emoji)?1:0; c_open_mouth += v; break;
          case "disappointed_relieved":
            v += (k==emoji)?1:0; c_disappointed_relieved += v; break;
          case "rage":
            v += (k==emoji)?1:0; c_rage += v; break;
          case "thumbsup":
            v += (k==emoji)?1:0; c_thumbsup += v; break;
          case "thumbsdown":
            v += (k==emoji)?1:0; c_thumbsdown += v; break;
          case "heart":
            v += (k==emoji)?1:0; c_heart += v; break;
        }
      });

      models.instance.Messages.update({msg_id: models.timeuuidFromString(msg_id)}, {
          has_emoji: {'$add': {
                              "grinning": c_grinning,
                              "joy": c_joy, 
                              "open_mouth": c_open_mouth, 
                              "disappointed_relieved": c_disappointed_relieved, 
                              "rage": c_rage, 
                              "thumbsup": c_thumbsup, 
                              "thumbsdown": c_thumbsdown, 
                              "heart": c_heart } }
      }, function(err){
          if(err) callback({status: false, err: err});
          callback({status: true});
      });
    }
  });
};
var view_reac_emoji_list = (msg_id, emoji, callback) =>{
  models.instance.MessageEmoji.find({msg_id: models.timeuuidFromString(msg_id), emoji_name: emoji}, {raw:true, allow_filtering: true}, function(err, emoji_user_list){
    if(err){
      callback({status: false, result: err});
    }else{
      callback({status: true, result: emoji_user_list});
    }
  });
};


var flag_unflag = (msg_id, uid, is_add, callback) =>{
  if(is_add == 'no'){
    models.instance.Messages.update({msg_id: models.timeuuidFromString(msg_id)}, {
        has_flagged: {'$remove': [uid]}
    }, function(err){
        if(err) callback({status: false, err: err});
        callback({status: true});
    });
  } else if(is_add == 'yes'){
    models.instance.Messages.update({msg_id: models.timeuuidFromString(msg_id)}, {
        has_flagged: {'$add': [uid]}
    }, function(err){
        if(err) callback({status: false, err: err});
        callback({status: true});
    });
  }
};

var commit_msg_delete = (msg_id, uid, callback) =>{
  models.instance.Messages.update({msg_id: models.timeuuidFromString(msg_id)}, {
      has_delete: {'$add': [uid]}
  }, function(err){
      if(err) callback({status: false, err: err});
      callback({status: true});
  });
};

// var sendBusyMsg = (data, callback) => {

//   var uuidfrom = models.uuidFromString(data.user_id);

//   var query_object = {id: uuidfrom};
//   var update_values_object = {is_busy: data.is_busy};
//   var options = {ttl: 86400, if_exists: true};

//   models.instance.Users.update(query_object, update_values_object, function(err){
//     if(err) callback({status: false, err: err});
//     callback({status: true});
//   }); 
// };

var sendBusyMsg = (data, callback) => {
  if(typeof data.user_id=='object'){
    var uuidfrom = (data.user_id);
  }else{
    var uuidfrom = models.uuidFromString(data.user_id);
  }
  

  var query_object = {id: uuidfrom};
  var update_values_object = {is_busy: data.is_busy};
  var options = {ttl: 86400, if_exists: true};

  models.instance.Users.update(query_object, update_values_object, function(err){
    if(err) callback({status: false, err: err});
    callback({status: true});
  }); 
};

var sendCallMsg = (from, sender_img, sender_name, conversation_id, msg, msgtype, callback) => {
  
  var createdat = new Date().getTime();
  var msgid = models.timeuuid();
  if(isRealString(msg)){
    uuidconversation_id = models.uuidFromString(conversation_id);
    uuidfrom = models.uuidFromString(from);
    var message = new models.instance.Messages({
        msg_id: msgid,
        msg_body: msg,
        sender: uuidfrom,
        sender_name: sender_name,
        sender_img: sender_img,
        conversation_id: uuidconversation_id,
        msg_type : msgtype
    });

    message.saveAsync()
        .then(function(res) {
            callback({status:true, res: msgid});
        })
        .catch(function(err) {
            callback({status:false, err: err});
        });
  } else {
    callback({status:false, err: 'Message formate not supported.'});
  }
};


module.exports = {generateMessage, sendNewMsg, sendCallMsg, sendBusyMsg, commit_msg_delete, flag_unflag, add_reac_emoji, view_reac_emoji_list};
