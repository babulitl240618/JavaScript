var express = require('express');
var moment = require('moment');
var router = express.Router();

var {models} = require('./../config/db/express-cassandra');

/* GET listing. */
router.get('/', function(req, res, next) {
  if(req.session.login){
    models.instance.Users.find({is_delete: 0}, {raw:true, allow_filtering: true}, function(err, users){
      if(err) throw err;
        //user is an array of plain objects with only name and age
      var res_data = {
        url:'polls',
        title: 'Polls',
        bodyClass: 'poll',
        success: req.session.success,
        error: req.session.error,
        user_id: req.session.user_id,
        user_fullname: req.session.user_fullname,
        user_email: req.session.user_email,
        user_img: req.session.user_img,
        has_login: true,
        data: users };
      res.render('polls', res_data);
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
