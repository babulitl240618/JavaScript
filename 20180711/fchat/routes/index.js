var express = require('express');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var router = express.Router();

var {models} = require('./../config/db/express-cassandra');
var {passwordToHass, passwordToCompare} = require('./../utils/hassing');
var {generateMessage, sendNewMsg, sendBusyMsg, commit_msg_delete, flag_unflag, add_reac_emoji} = require('./../utils/message');

/* GET login page. */
router.get('/', function(req, res, next) {
  if(req.session.login){
    res.redirect('/hayven');
  } else {
    res.render('index', { title: 'Login | NEC', bodyClass: 'centered-form', success: req.session.success, error: req.session.error, has_login: false });
  }
});

/* POST login listing. */
router.post('/', function(req, res, next) {
  if(req.session.login){
    res.redirect('/hayven');
  } else {
    models.instance.Users.findOne({email: req.body.email}, {raw:true, allow_filtering: true}, function(err, user){
        if(err) throw err;
        //user is an array of plain objects with only name and age
        if(user){
          if(passwordToCompare(req.body.password, user.password)) {
            req.session.success = true;
            req.session.login = true;
            req.session.user_id = _.replace(user.id, 'Uuid: ', '');
            req.session.user_fullname = user.fullname;
            req.session.user_email = user.email;
            req.session.user_img = user.img;
            sendBusyMsg({user_id:user.id,is_busy:0}, (result) =>{
              if(result.status){
                res.redirect('/hayven');
              }
            });
          } else {
            req.session.success = false;
            req.session.error = [{ msg: 'Username or Password or both are Invalid.' }];
            res.redirect('/');
          }
        } else {
          req.session.success = false;
          req.session.error = [{ msg: 'Username invalid.' }];
          res.redirect('/');
        }
    });
  }
});


module.exports = router;
