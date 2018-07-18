var app = require('express');
var cassandra = require('cassandra-driver');
var assert = require('assert');
var router = app.Router();

var {models} = require('./../config/db/express-cassandra');

router.get('/', (req, res, next) => {
  if(req.session.login){
    models.instance.Users.find({is_delete: 0}, {raw:true, allow_filtering: true}, function(err, users){
        if(err) throw err;
        //user is an array of plain objects with only name and age
        var res_data = {
          url:'chat',
          title: 'Chat',
          bodyClass: 'chat',
          success: req.session.success,
          error: req.session.error,
          user_id: req.session.user_id,
          user_fullname: req.session.user_fullname,
          user_email: req.session.user_email,
          has_login: true,
          data: users };
        res.render('chat', res_data);
    });
  } else {
    res.redirect('/');
  }
});

/**
 * When click on the user list,
 * read all message and send the result in json format
 */
router.post('/msg_history', (req, res) =>{
  if(req.session.login){
    models.instance.Message.find({}, function(err, messages){
        if(err) throw err;
        res.json(messages);
    });
  }
});

module.exports = router;
