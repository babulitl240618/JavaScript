var express = require('express');
var router = express.Router();

/* GET listing. */
router.get('/', function(req, res, next) {
  if(req.session.login){
    var res_data = {
      url:'quicklists',
      title: 'Conncet',
      bodyClass: 'chat',
      success: req.session.success,
      error: req.session.error,
      user_id: req.session.user_id,
      user_fullname: req.session.user_fullname,
      user_email: req.session.user_email,
      user_img: req.session.user_img,
      has_login: true,
      data: '' };
    res.render('quicklists', res_data);
  } else {
    res.redirect('/');
  }
});
module.exports = router;
