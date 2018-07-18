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
        url:'projects',
        title: 'Project',
        bodyClass: 'chat',
        success: req.session.success,
        error: req.session.error,
        user_id: req.session.user_id,
        user_fullname: req.session.user_fullname,
        user_email: req.session.user_email,
        user_img: req.session.user_img,
        has_login: true,
        data: users };
      res.render('projects', res_data);
    });
  } else {
    res.redirect('/');
  }
});

// router.get('/', function(req, res, next) {
//   if(req.session.login){
//     models.instance.Users.find({is_delete: 0}, {raw:true, allow_filtering: true}, function(err, users){
//         if(err) throw err;
//         //user is an array of plain objects with only name and age
//         var res_data = {
//           title: 'Project | NEC',
//           bodyClass: 'chat',
//           success: req.session.success,
//           error: req.session.error,
//           user_id: req.session.user_id,
//           user_fullname: req.session.user_fullname,
//           user_email: req.session.user_email,
//           has_login: true,
//           data: users };
//         res.render('projects', res_data);
//     });
//   } else {
//     res.redirect('/');
//   }
// });

router.get('/projectDetail/:id', function(req, res, next) {
  if(req.session.login){
    var res_data = {
      url:'projects',
      title: 'Hayven',
      bodyClass: 'chat',
      success: req.session.success,
      error: req.session.error,
      user_id: req.session.user_id,
      user_fullname: req.session.user_fullname,
      user_email: req.session.user_email,
      user_img: req.session.user_img,
      has_login: true,
      data: '' };
    res.render('project-dashboard', res_data);
  } else {
    res.redirect('/');
  }
});
// router.get('/p-d-c/:id', function(req, res, next) {
//   if(req.session.login){
//     var res_data = {
//       title: 'Hayven',
//       bodyClass: 'chat',
//       success: req.session.success,
//       error: req.session.error,
//       user_id: req.session.user_id,
//       user_fullname: req.session.user_fullname,
//       user_email: req.session.user_email,
//       user_img: req.session.user_img,
//       has_login: true,
//       moment: moment,
//       data: '' };
//     res.render('p-d-c', res_data);
//   } else {
//     res.redirect('/');
//   }
// });

router.get('/p-d-c/:id', function(req, res, next) {
  if(req.session.login){
    models.instance.Users.find({is_delete: 0}, {raw:true, allow_filtering: true}, function(err, users){
      if(err) throw err;
        //user is an array of plain objects with only name and age
      var res_data = {
        url:'projects',
        title: 'Project',
        bodyClass: 'chat',
        success: req.session.success,
        error: req.session.error,
        user_id: req.session.user_id,
        user_fullname: req.session.user_fullname,
        user_email: req.session.user_email,
        user_img: req.session.user_img,
        has_login: true,
        moment: moment,
        data: users };
      res.render('p-d-c', res_data);
    });
  } else {
    res.redirect('/');
  }
});


router.get('/projectDetail/kb/:id', function(req, res, next) {
  if(req.session.login){
    var res_data = {
      url:'projects',
      title: 'Hayven',
      bodyClass: 'chat',
      success: req.session.success,
      error: req.session.error,
      user_id: req.session.user_id,
      user_fullname: req.session.user_fullname,
      user_email: req.session.user_email,
      user_img: req.session.user_img,
      has_login: true,
      data: '' };
    res.render('kanban-dashboard', res_data);
  } else {
    res.redirect('/');
  }
});

module.exports = router;
