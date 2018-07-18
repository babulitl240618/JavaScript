var express = require('express');
var router = express.Router();
// var fileUpload = require('express-fileupload'); 
var multer = require('multer');
var highlight = require('highlight');
var moment = require('moment');
var path = require('path');
var _ = require('lodash');
var inArray = require('in-array');

var {models} = require('./../config/db/express-cassandra');
var {file2mimetype} = require('./../utils/mimetype');
var {getActiveUsers} = require('./../utils/chatuser');
var {saveConversation, findConversationHistory,checkAdmin,createPersonalConv} = require('./../utils/conversation');
var {generateMessage, sendNewMsg, sendBusyMsg, commit_msg_delete, flag_unflag, add_reac_emoji, view_reac_emoji_list} = require('./../utils/message');


// creates a configured middleware instance
// destination: handles destination
// filenane: allows you to set the name of the recorded file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/upload/`))
    },
    filename: function (req, file, callback) {
        callback(null,file.fieldname+'-'+ file.originalname.replace(path.extname(file.originalname), '_') +'-' +Date.now() +  path.extname(file.originalname));
    }
});

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage });


/* GET listing. */
router.get("/", function(req, res, next) {
  if (req.session.login) {
    var query = {
      participants: { $contains: req.session.user_id },
      group: { $eq: 'yes' },
      single: { $eq: 'no' }
    };

    models.instance.Conversation.find(
      query,
      { raw: true, allow_filtering: true },
      function(err, peoples) {
        if (err) throw err;
        //people is an array of plain objects satisfying the query conditions above
        getActiveUsers((uresult, uerror) => {
          if (uerror) console.log(uerror);

          var blockUserListArray = [];
          var blockGroupListArray = [];

          if((uresult.users).length>0){
            _.each(uresult.users, function(user,k){
				if(user.id.toString() != req.session.user_id){
					blockUserListArray.push({
						userid: user.id,
						conversation_id: user.id,
						conversation_type: "personal",
						box_type: 'default',
						unread: 0,
						users_name: user.fullname,
						users_img: user.img,
						pined: false,
						sub_title: user.designation,
						last_msg: '',
						last_msg_time: '',
						display: 'block'
					});
				}
              
            });
          }

          if((peoples).length>0){
            _.each(peoples, function(group,k){
              blockGroupListArray.push({
                userid: req.session.user_id,
                conversation_id: group.conversation_id,
                conversation_type: "group",
                box_type: 'success',
                unread: 0,
                users_name: group.title,
                users_img: 'feelix.jpg',
                pined: false,
                sub_title: group.group_keyspace,
                last_msg: '',
                last_msg_time: moment(group.created_at).format('h:mm a'),
                display: 'block'
              });
            });
          }
          var finalListArray = blockUserListArray.concat(blockGroupListArray);
          var sortedArray =[];
          var pin =[];
          var unpin =[];

          

          models.instance.Pinned.find({user_id: models.uuidFromString(req.session.user_id) }, function(err, pinnedBlocks) {
            if (err) throw err;
            
            var totalPinned = parseInt(pinnedBlocks.length)+1;
            _.each(pinnedBlocks, function(val,key){
              sortedArray.push(val.block_id.toString());
            });

            _.each(finalListArray, function(value,key){
              _.each(pinnedBlocks, function(val,key){
                if( value.conversation_id.toString() == val.block_id.toString()){
                  sortedArray.push(val.block_id.toString());
                  pin.push({
                    pinned:val.id.toString(),
                    user_id: value.userid.toString(),
                    conversation_id: value.conversation_id.toString(),
                    conversation_type: value.conversation_type,
                    box_type: value.box_type,
                    unread: value.unread,
                    users_name: value.users_name,
                    users_img: value.users_img,
                    pined: true,
                    sub_title: value.sub_title,
                    last_msg: '',
                    last_msg_time: moment(value.last_msg_time).format('h:mm a'),
                    display: 'block'
                  });
                }

              });
            });

            _.each(finalListArray, function(value,key){
              if(!inArray(sortedArray, value.conversation_id.toString() )){
                unpin.push({
                  user_id: value.userid.toString(),
                  conversation_id: value.conversation_id.toString(),
                  conversation_type: value.conversation_type,
                  box_type: value.box_type,
                  unread: value.unread,
                  users_name: value.users_name,
                  users_img: value.users_img,
                  pined: false,
                  sub_title: value.sub_title,
                  last_msg: '',
                  last_msg_time: moment(value.last_msg_time).format('h:mm a'),
                  display: 'block'
                });
              }
            });

            console.log(pin);
            console.log(unpin);
            
            var res_data = {
			  url:'hayven',
              title: "Connect",
              bodyClass: "chat",
              success: req.session.success,
              error: req.session.error,
              user_id: req.session.user_id,
              user_fullname: req.session.user_fullname,
              user_email: req.session.user_email,
              user_img: req.session.user_img,
              highlight: highlight,
              moment: moment,
              _:_,
              has_login: true,
              data: [{ users: uresult.users, groups: peoples, finalListArray:finalListArray, pin:pin, unpin:unpin  }],
            };
            res.render("connect", res_data);
          });
          

        });
      }
    );
  } else {
    res.redirect("/");
  }
});
router.get("/chat/:type/:id/:conversationid/:name/:img", function(req,res,next) {
  if (req.session.login) {
    models.instance.Conversation.find({conversation_id: models.timeuuidFromString(req.params.conversationid) }, function(err, conversationDetail) {
        if (err) throw err;

        findConversationHistory(models.timeuuidFromString(req.params.conversationid), (result, error) => {
          var conversation_list = _.sortBy(result.conversation, ["created_at",]);
          getActiveUsers((uresult, uerror) => {
            var res_data = {
              url:'hayven',
              title: "Connect",
              bodyClass: "chat",
              success: req.session.success,
              error: req.session.error,
              user_id: req.session.user_id,
              conversationid: req.params.conversationid,
              user_fullname: req.session.user_fullname,
              user_email: req.session.user_email,
              user_img: req.session.user_img,
              to_user_name: req.params.name,
              highlight: highlight,
              _: _, 
              moment: moment,
              file_message: "No",
              has_login: true,
              data: [
                {
                  conversation_id: req.params.conversationid,
                  conversation_type: req.params.type,
                  users: uresult.users,
                  conversation: conversationDetail,
                  room_id: req.params.id,
                  room_name: req.params.name,
                  room_img: req.params.img,
                  conversation_list: conversation_list
                },
              ],
            };
            res.render("open-chat", res_data);
          });
        });        
    });

    //get all conversation and check, has this conversation or not
    // if (req.params.type === "group") {
    //   models.instance.Conversation.find(
    //     {
    //       conversation_id: models.timeuuidFromString(req.params.conversationid),
    //     },
    //     function(err, conversationDetail) {
    //       if (err) throw err;

    //       getActiveUsers((uresult, uerror) => {
    //         var res_data = {
    //           title: "Hayven",
    //           bodyClass: "chat",
    //           success: req.session.success,
    //           error: req.session.error,
    //           user_id: req.session.user_id,
    //           conversationid: req.params.conversationid,
    //           user_fullname: req.session.user_fullname,
    //           user_email: req.session.user_email,
    //           user_img: req.session.user_img,
    //           highlight: highlight,
    //           moment: moment,
    //           file_message: "No",
    //           has_login: true,
    //           data: [
    //             {
    //               conversation_id: req.params.conversationid,
    //               users: uresult.users,
    //               conversation: conversationDetail,
    //             },
    //           ],
    //         };
    //         res.render("open-chat", res_data);
    //       });
    //     }
    //   );
    // } else if (req.params.type === "personal") {
    //   var conversation_id = [];
    //   models.instance.Conversation.find(
    //     {},
    //     { raw: true, allow_filtering: true },
    //     function(conerr, conlist) {
    //       if (conerr) throw conerr;

    //       _.each(conlist, function(v, k) {
    //         var list_of_participants = _.split(v.participants, ",");
    //         if (
    //           _.indexOf(list_of_participants, req.params.id) > -1 &&
    //           _.indexOf(list_of_participants, req.session.user_id) > -1
    //         ) {
    //           conversation_id.push(v.conversation_id);
    //           return 0;
    //         }
    //       });

    //       if (conversation_id.length == 0) {
    //         //This is a new conversation block
    //         var participant_str = req.session.user_id + "," + req.params.id;
    //         saveConversation(
    //           req.session.user_id,
    //           participant_str,
    //           "display the user name",
    //           (result, error) => {
    //             conversation_id.push(result.conversation_id);

    //             getActiveUsers((uresult, uerror) => {
    //               if (uerror) console.log(uerror);

    //               var conversation_list = [];

    //               var res_data = {
    //                 title: "Hayven",
    //                 bodyClass: "chat",
    //                 success: req.session.success,
    //                 error: req.session.error,
    //                 user_id: req.session.user_id,
    //                 conversationid: req.params.conversationid,
    //                 user_fullname: req.session.user_fullname,
    //                 user_email: req.session.user_email,
    //                 user_img: req.session.user_img,
    //                 highlight: highlight,
    //                 moment: moment,
    //                 file_message: "No",
    //                 has_login: true,
    //                 data: [
    //                   {
    //                     conversation_id: _.replace(
    //                       conversation_id[0],
    //                       "Uuid: ",
    //                       ""
    //                     ),
    //                     room_id: req.params.id,
    //                     room_name: req.params.name,
    //                     room_img: req.params.img,
    //                     users: uresult.users,
    //                     conversation: conversation_list,
    //                   },
    //                 ],
    //               };
    //               res.render("open-chat", res_data);
    //             });
    //           }
    //         );
    //       } else {
    //         //Old conversation block
    //         // console.log(98, conversation_id);
    //         findConversationHistory(conversation_id, (result, error) => {
    //           var conversation_list = _.sortBy(result.conversation, [
    //             "created_at",
    //           ]);
    //           getActiveUsers((uresult, uerror) => {
    //             if (uerror) console.log(uerror);

    //             // console.log(104, uresult.users);
    //             var res_data = {
    //               title: "Hayven",
    //               bodyClass: "chat",
    //               success: req.session.success,
    //               error: req.session.error,
    //               user_id: req.session.user_id,
    //               conversationid: req.params.conversationid,
    //               user_fullname: req.session.user_fullname,
    //               user_email: req.session.user_email,
    //               user_img: req.session.user_img,
    //               highlight: highlight,
    //               moment: moment,
    //               file_message: "No",
    //               has_login: true,
    //               data: [
    //                 {
    //                   conversation_id: _.replace(
    //                     conversation_id[0],
    //                     "Uuid: ",
    //                     ""
    //                   ),
    //                   room_id: req.params.id,
    //                   room_name: req.params.name,
    //                   room_img: req.params.img,
    //                   users: uresult.users,
    //                   conversation: conversation_list,
    //                 },
    //               ],
    //             };
    //             res.render("open-chat", res_data);
    //           });
    //         });
    //       }
    //     }
    //   );
    // }

    
  } else {
    res.redirect("/");
  }
});

// For New Group Testing Purpose ocn = open chat test
router.get('/chat-t/:id/:name/:img', function(req, res, next){
  if(req.session.login){
    getActiveUsers((uresult, uerror) => {
      if(uerror) console.log(uerror);
        //user is an array of plain objects with only name and age
        var res_data = {
          url:'hayven',
          title: 'Connect',
          bodyClass: 'chat',
          success: req.session.success,
          error: req.session.error,
          user_id: req.session.user_id,
          user_fullname: req.session.user_fullname,
          user_email: req.session.user_email,
          user_img: req.session.user_img,
          highlight: highlight,
          moment: moment,
          file_message: 'No',
          has_login: true,
          data: [{'room_id':req.params.id, 'room_name':req.params.name, 'room_img':req.params.img,'users':uresult.users}] };
          res.render('oct', res_data);
    });
  } else {
    res.redirect('/');
  }
});

//This is a test route 
router.get('/testmulter', function(req, res, next){
  res.render('textpage');
});

router.post('/send_message', upload.array('photos', 10), function(req, res, next){
  // res.json(req.files);
  // console.log(req.files);
  if(req.session.login){
    if (req.files.length < 1){
      res.json({'msg':'No files were uploaded.'});
    }
    else{
      res.json({'file_info': req.files, 'msg': 'Successfully uploaded'});
    }
  } else {
    res.redirect('/');
  }
});

router.post('/add_reac_emoji', function(req, res, next){
  if(req.session.login){
    add_reac_emoji(req.body.msgid, req.session.user_id, req.session.user_fullname, req.body.emoji, (result) =>{
      res.json(result);
    });
  } else { 
    res.redirect('/');
  }
});
router.post('/emoji_rep_list', function(req, res, next){
  if(req.session.login){
    view_reac_emoji_list(req.body.msgid, req.body.emojiname, (result) =>{
      res.json(result.result);
    });
  } else { 
    res.redirect('/');
  }
});

router.post('/flag_unflag', function(req, res, next){
  if(req.session.login){
    flag_unflag(req.body.msgid, req.body.uid, req.body.is_add, (result) =>{
      res.json(result);
    });
  } else {
    res.redirect('/');
  }
});


router.post('/commit_msg_delete', function(req, res, next){
  if(req.session.login){
    commit_msg_delete(req.body.msgid, req.body.uid, (result) =>{
      res.json(result);
    });
  } else {
    res.redirect('/');
  }
});

router.get('/new-group', function(req, res, next){
  if(req.session.login){
    getActiveUsers((uresult, uerror) => {
      if(uerror) console.log(uerror);
        //user is an array of plain objects with only name and age
      var res_data = {
        url:'hayven',
        title: 'Connect',
        bodyClass: 'chat',
        success: req.session.success,
        error: req.session.error,
        user_id: req.session.user_id,
        user_fullname: req.session.user_fullname,
        user_email: req.session.user_email,
        user_img: req.session.user_img,
        has_login: true,
        data: [{'room_id':0, 'room_name':'Unnamed Group','users':uresult.users}] };
      res.render('chat-new-group', res_data);
    });

  } else {
    res.redirect('/');
  }
});


// Url for remove participants ID from conversation tbl
router.post("/groupMemberDelete", function(req, res, next) {
  if (req.session.login) {
    checkAdmin(req.body.conversation_id, req.body.targetID, result => {
      if (result) {
        if (result.status) {
          var newConversationArray = result.conversation;
          if (typeof newConversationArray[0] !== "undefined" && newConversationArray[0] !== null) {
            res.send(JSON.stringify("creator"));
          } else {
            models.instance.Conversation.update({conversation_id: models.timeuuidFromString(req.body.conversation_id),},{
                participants_admin: { $remove: [req.body.targetID] },
                participants: { $remove: [req.body.targetID] },
              },function(err) {
                if (err) {
                  if (err) throw err;
                } else {
                  res.send(JSON.stringify("success"));
                }
              }
            );
          }
        } else {
          console.log(result.status);
        }
      } else {
        console.log(result);
      }
    });
  } else {
    res.redirect("/");
  }
});

// Url for add participants ID in conversation tbl
router.post("/groupMemberAdd", function(req, res, next) {
  if (req.session.login) {
    models.instance.Conversation.update(
      { conversation_id: models.timeuuidFromString(req.body.conversation_id) },
      {
        participants: { $add: [req.body.targetID] },
      },
      function(err) {
        if (err) {
          if (err) throw err;
        } else {
          res.send(JSON.stringify("success"));
        }
      }
    );
  } else {
    res.redirect("/");
  }
});

// Url for add member ID in conversation tbl
router.post("/makeMember", function(req, res, next) {
  if (req.session.login) {
    models.instance.Conversation.update(
      { conversation_id: models.timeuuidFromString(req.body.conversation_id) },
      {
        participants_admin: { $remove: [req.body.targetID] },
      },
      function(err) {
        if (err) {
          if (err) throw err;
        } else {
          res.send(JSON.stringify("success"));
        }
      }
    );
  } else {
    res.redirect("/");
  }
});

// Url for add member ID in conversation tbl 
router.post("/makeAdmin", function(req, res, next) {
  if (req.session.login) {
    models.instance.Conversation.update(
      { conversation_id: models.timeuuidFromString(req.body.conversation_id) },
      {
        participants_admin: { $add: [req.body.targetID] },
      },
      function(err) {
        if (err) {
          if (err) throw err;
        } else {
          res.send(JSON.stringify("success"));
        }
      }
    );
  } else {
    res.redirect("/");
  }
});


// Url for add member ID in conversation tbl
router.post("/personalConCreate", function(req, res, next) {
  if (req.session.login) {
    createPersonalConv( req.session.user_id, req.body.targetID, req.body.ecosystem, (result, err) =>{
		if (err) {
          if (err) throw err;
		} else if(result.status){
			res.send(JSON.stringify(result));
		} else {
			console.log(result);
		}
    });
	
    // res.json("hi");
  } else {
    res.redirect("/");
  }
});


// Pinned URL
router.post("/pinning", function(req, res, next) {
  if (req.session.login) {
    if(req.body.type == 'pin'){
      var id = models.uuid();
      var pinned = new models.instance.Pinned({
        id: id,
        user_id: models.uuidFromString(req.session.user_id),
        serial_number: parseInt(req.body.pinnedNumber),
        block_id:models.uuidFromString(req.body.blockID)
      });

      pinned.saveAsync().then(function() {
        
        var query = {
          participants: { $contains: req.session.user_id },
          group: { $eq: 'yes' },
          single: { $eq: 'no' }
        };
    
        models.instance.Conversation.find( query, { raw: true, allow_filtering: true },function(err, peoples) {
          if (err) throw err;

          //people is an array of plain objects satisfying the query conditions above
          getActiveUsers((uresult, uerror) => {
            if (uerror) console.log(uerror);
  
            var blockUserListArray = [];
            var blockGroupListArray = [];
  
            if((uresult.users).length>0){
              _.each(uresult.users, function(user,k){
				if(user.id.toString() != req.session.user_id){
					blockUserListArray.push({
					  userid: user.id,
					  conversation_id: user.id,
					  conversation_type: "personal",
					  box_type: 'default',
					  unread: 0,
					  users_name: user.fullname,
					  users_img: user.img,
					  pined: false,
					  sub_title: user.designation,
					  last_msg: '',
					  last_msg_time: '',
					  display: 'block'
					});
				}
                
              });
            }
  
            if((peoples).length>0){
              _.each(peoples, function(group,k){
                blockGroupListArray.push({
                  userid: req.session.user_id,
                  conversation_id: group.conversation_id,
                  conversation_type: "group",
                  box_type: 'success',
                  unread: 0,
                  users_name: group.title,
                  users_img: 'feelix.jpg',
                  pined: false,
                  sub_title: group.group_keyspace,
                  last_msg: '',
                  last_msg_time: moment(group.created_at).format('h:mm a'),
                  display: 'block'
                });
              });
            }
            var finalListArray = blockUserListArray.concat(blockGroupListArray);
            var sortedArray =[];
            var pin =[];
            var unpin =[];
  
            models.instance.Pinned.find({user_id: models.uuidFromString(req.session.user_id) }, function(err, pinnedBlocks) {
              if (err) throw err;
              
              var totalPinned = parseInt(pinnedBlocks.length)+1;
              _.each(pinnedBlocks, function(val,key){
                sortedArray.push(val.block_id.toString());
              });
  
              _.each(finalListArray, function(value,key){
                _.each(pinnedBlocks, function(val,key){
                  if( value.conversation_id.toString() == val.block_id.toString()){
                    sortedArray.push(val.block_id.toString());
                    pin.push({
                      pinned:val.id,
                      user_id: value.user_id,
                      conversation_id: value.conversation_id,
                      conversation_type: value.conversation_type,
                      box_type: value.box_type,
                      unread: value.unread,
                      users_name: value.users_name,
                      users_img: value.users_img,
                      pined: true,
                      sub_title: value.sub_title,
                      last_msg: '',
                      last_msg_time: moment(value.last_msg_time).format('h:mm a'),
                      display: 'block'
                    });
                  }
  
                });
              });
  
              _.each(finalListArray, function(value,key){
                if(!inArray(sortedArray, value.conversation_id.toString() )){
                  unpin.push({
                    user_id: value.user_id,
                    conversation_id: value.conversation_id,
                    conversation_type: value.conversation_type,
                    box_type: value.box_type,
                    unread: value.unread,
                    users_name: value.users_name,
                    users_img: value.users_img,
                    pined: false,
                    sub_title: value.sub_title,
                    last_msg: '',
                    last_msg_time: moment(value.last_msg_time).format('h:mm a'),
                    display: 'block'
                  });
                }
              });
              
              res.send(JSON.stringify({status:true, id,finalListArray:finalListArray, pin:pin, unpin:unpin}));
            });
            
  
          });
        });
      }).catch(function(err) {
        if (err) throw err;
      });

    }else if(req.body.type == 'unpin'){
      //DELETE FROM Pinned WHERE id='??';
      console.log(req.body);
      var query_object = {
        id: models.uuidFromString(req.body.targetID) 
      };

      models.instance.Pinned.delete(query_object, function(err){
          if(err) res.send(JSON.stringify({err}));
          else {
            var query = {
              participants: { $contains: req.session.user_id },
              group: { $eq: 'yes' },
              single: { $eq: 'no' }
            };
        
            models.instance.Conversation.find( query, { raw: true, allow_filtering: true },function(err, peoples) {
              if (err) throw err;
              
              //people is an array of plain objects satisfying the query conditions above
              getActiveUsers((uresult, uerror) => {
                if (uerror) console.log(uerror);
      
                var blockUserListArray = [];
                var blockGroupListArray = [];
      
                if((uresult.users).length>0){
                  _.each(uresult.users, function(user,k){
                    blockUserListArray.push({
                      userid: user.id,
                      conversation_id: user.id,
                      conversation_type: "personal",
                      box_type: 'default',
                      unread: 0,
                      users_name: user.fullname,
                      users_img: user.img,
                      pined: false,
                      sub_title: user.designation,
                      last_msg: '',
                      last_msg_time: '',
                      display: 'block'
                    });
                  });
                }
      
                if((peoples).length>0){
                  _.each(peoples, function(group,k){
                    blockGroupListArray.push({
                      userid: req.session.user_id,
                      conversation_id: group.conversation_id,
                      conversation_type: "group",
                      box_type: 'success',
                      unread: 0,
                      users_name: group.title,
                      users_img: 'feelix.jpg',
                      pined: false,
                      sub_title: group.group_keyspace,
                      last_msg: '',
                      last_msg_time: moment(group.created_at).format('h:mm a'),
                      display: 'block'
                    });
                  });
                }
                var finalListArray = blockUserListArray.concat(blockGroupListArray);
                var sortedArray =[];
                var pin =[];
                var unpin =[];
      
                models.instance.Pinned.find({user_id: models.uuidFromString(req.session.user_id) }, function(err, pinnedBlocks) {
                  if (err) throw err;
                  
                  var totalPinned = parseInt(pinnedBlocks.length)+1;
                  _.each(pinnedBlocks, function(val,key){
                    sortedArray.push(val.block_id.toString());
                  });
      
                  _.each(finalListArray, function(value,key){
                    _.each(pinnedBlocks, function(val,key){
                      if( value.conversation_id.toString() == val.block_id.toString()){
                        sortedArray.push(val.block_id.toString());
                        pin.push({
                          pinned:val.id,
                          user_id: value.user_id,
                          conversation_id: value.conversation_id,
                          conversation_type: value.conversation_type,
                          box_type: value.box_type,
                          unread: value.unread,
                          users_name: value.users_name,
                          users_img: value.users_img,
                          pined: true,
                          sub_title: value.sub_title,
                          last_msg: '',
                          last_msg_time: moment(value.last_msg_time).format('h:mm a'),
                          display: 'block'
                        });
                      }
      
                    });
                  });
      
                  _.each(finalListArray, function(value,key){
                    if(!inArray(sortedArray, value.conversation_id.toString() )){
                      unpin.push({
                        user_id: value.user_id,
                        conversation_id: value.conversation_id,
                        conversation_type: value.conversation_type,
                        box_type: value.box_type,
                        unread: value.unread,
                        users_name: value.users_name,
                        users_img: value.users_img,
                        pined: false,
                        sub_title: value.sub_title,
                        last_msg: '',
                        last_msg_time: moment(value.last_msg_time).format('h:mm a'),
                        display: 'block'
                      });
                    }
                  });
                  
                  res.send(JSON.stringify({status:true, finalListArray:finalListArray, pin:pin, unpin:unpin}));
                });
                
      
              });
            });
          }
      });
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;


