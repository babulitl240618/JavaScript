var express = require('express');
var router = express.Router();
var highlight = require('highlight');

var {models} = require('./../config/db/express-cassandra');
//var {generateMessage, sendNewMsg} = require('./../utils/message');

router.get('/audio/:id/:name/:img', function(req, res, next){
  if(req.session.login){
    //models.instance.Users.find({id: req.params.id}, {raw:true, allow_filtering: true}, function(err, users){
    //if(err) throw err;
      
    var res_data = {
      url:'call',
      title: 'Connect',
      bodyClass: 'chat',
      success: req.session.success,
      error: req.session.error,
      user_id: req.session.user_id,
      user_fullname: req.session.user_fullname,
      user_email: req.session.user_email,
      user_img: req.session.user_img,
      highlight: highlight,
      roomid : false,
      has_login: true,
      data: [{
        'room_id':req.params.id, 
        'room_name':req.params.name, 
        'room_img':req.params.img, 
        'callername':req.session.user_fullname,
        'callerimg':req.session.user_img,
        'callerid':req.session.user_id
      }]
    };
      
    res.render('audio-call', res_data);
    //});
  } else {
    res.redirect('/');
  }
});

router.get('/audio/:id/:name/:img/:roomid/:callername/:callerimg/:callerid', function(req, res, next){
  if(req.session.login){
    //models.instance.Users.find({id: req.params.id}, {raw:true, allow_filtering: true}, function(err, users){
    //if(err) throw err;
      
    var res_data = {
      url:'call',
      title: 'Hayven',
      bodyClass: 'chat',
      success: req.session.success,
      error: req.session.error,
      user_id: req.session.user_id,
      user_fullname: req.session.user_fullname,
      user_email: req.session.user_email,
      user_img: req.session.user_img,
      highlight: highlight,
      roomid : req.params.roomid,
      has_login: true,
      data: [{
        'room_id':req.params.id, 
        'room_name':req.params.name, 
        'room_img':req.params.img, 
        'callername':req.params.callername,
        'callerimg':req.params.callerimg , 
        'callerid':req.params.callerid
      }] 
    };

    res.render('audio-call', res_data);
    //});
  } else {
    res.redirect('/');
  }
});

router.get('/video/:id/:name/:img', function(req, res, next){
  if(req.session.login){
    var res_data = {
      url:'call',
      title: 'Connect',
      bodyClass: 'chat',
      success: req.session.success,
      error: req.session.error,
      user_id: req.session.user_id,
      user_fullname: req.session.user_fullname,
      user_email: req.session.user_email,
      user_img: req.session.user_img,
      highlight: highlight,
      roomid : false,
      has_login: true,
      data: [{
        'room_id':req.params.id, 
        'room_name':req.params.name, 
        'room_img':req.params.img,
        'callername':req.session.user_fullname,
        'callerimg':req.session.user_img,
        'callerid':req.session.user_id
      }] 
    };
    res.render('video-call', res_data);
  } else {
    res.redirect('/');
  }
});

router.get('/video/:id/:name/:img/:roomid/:callername/:callerimg/:callerid', function(req, res, next){
  if(req.session.login){
    var res_data = {
      url:'call',
      title: 'Connect',
      bodyClass: 'chat',
      success: req.session.success,
      error: req.session.error,
      user_id: req.session.user_id,
      user_fullname: req.session.user_fullname,
      user_email: req.session.user_email,
      user_img: req.session.user_img,
      highlight: highlight,
      roomid : req.params.roomid,
      has_login: true,
      data: [{
        'room_id':req.params.id, 
        'room_name':req.params.name, 
        'room_img':req.params.img,
        'callername':req.params.callername,
        'callerimg':req.params.callerimg, 
        'callerid':req.params.callerid
      }] 
    };
    res.render('video-call', res_data);
  } else {
    res.redirect('/');
  }
});

module.exports = router;
