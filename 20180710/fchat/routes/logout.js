var express = require('express');
var router = express.Router();


/* GET logout and destroy session. */
router.get('/', function(req, res, next) {
  if(req.session.login){
    req.session.destroy();
    res.redirect('/');
  }
});

module.exports = router;
