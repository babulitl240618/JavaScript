var app = require('express');
var router = app.Router();
var _ = require('lodash');

var {models} = require('./../config/db/express-cassandra');

var saveConversation = (created_by, participants, title, callback) => {
  var conversation_id = models.uuid();
  var conversation = new models.instance.Conversation({
    conversation_id: conversation_id,
    created_by: models.uuidFromString(created_by),
    participants: participants,
    title: title
  });
  conversation.saveAsync().then(function() {
    callback({status:true, conversation_id});
  }).catch(function(err) {
    callback({status:false, err: err});
  });
};

var createGroup = (adminList,memberList,groupName,createdBy,ecosystem,grpprivacy,callback) =>{
  var conversation_id = models.uuid();
  var conversation = new models.instance.Conversation({
      conversation_id: conversation_id,
      created_by: models.uuidFromString(createdBy),
      group: 'yes',
      group_keyspace:ecosystem,
      privacy:grpprivacy,
      single: 'no',
      participants_admin: adminList,
      participants: memberList,
      title: groupName
  });
  conversation.saveAsync().then(function() {
    callback({status:true, conversation_id});
  }).catch(function(err) {
    callback({status:false, err: err});
  });
};

var findConversationHistory = (conversation_id, callback) =>{
  models.instance.Messages.find({conversation_id: conversation_id}, {raw:true, allow_filtering: true}, function(err, conversation){
    if(err){
      callback({status: false, err: err});
    }else{
      callback({status: true, conversation: conversation});
    }
  });
};

var checkAdmin = (conversation_id,useruuid, callback) =>{
  models.instance.Conversation.find({conversation_id: models.timeuuidFromString(conversation_id),created_by: models.timeuuidFromString(useruuid)}, {raw:true, allow_filtering: true}, function(err, conversation){
    if(err){
      callback({status: false, err: err});
    }else{
      callback({status: true, conversation: conversation});
    }
  });
};


var createPersonalConv = (myID, frndID, ecosystem, callback) =>{
	
  var query = {
    participants: { $contains: myID },
    group: { $eq: 'no' },
    single: { $eq: 'yes' }
  };

  models.instance.Conversation.find(query,{ raw: true, allow_filtering: true }, function(err, conversation) {
    if(err){
      console.log("This is err",err);
      callback({status: false, err: err});
    }else{
      var resultCount = 0;
      var resultArray = 0;
      _.each(conversation, function(v, k) {
        var result = _.find(v.participants, function (str, i) {
          if (str.match(frndID)){
            return true;
          }
        });

        if(result !== undefined){
          resultCount++;
          resultArray = v.conversation_id;
        }
      });

      if(resultCount>0){
        callback({status: true, conversation_id: resultArray});
      }else{
        var conversation_id = models.uuid();
        var memberList = [myID,frndID];
        var conversation = new models.instance.Conversation({
            conversation_id: conversation_id,
            created_by: models.uuidFromString(myID),
            group: 'no',
            group_keyspace:ecosystem,
            privacy:'private',
            single: 'yes',
            participants: memberList,
            title: 'Personal'
        });
        conversation.saveAsync().then(function() {
          callback({status:true, conversation_id});
        }).catch(function(err) {
          callback({status:false, err: err});
        });
      }
    }
  });
};

module.exports = {saveConversation, findConversationHistory, createGroup,checkAdmin,createPersonalConv};
