var express = require('express');
var moment = require('moment');
var router = express.Router();
var path = require('path');
var multer = require('multer');

var { models } = require('./../config/db/express-cassandra');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve('./public/user_uploads/'))
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + file.originalname.replace(path.extname(file.originalname), '_') + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });




/* GET listing. */
router.get('/', function(req, res, next) {
  if(req.session.login){
    models.instance.Users.find({is_delete: 0}, {raw:true, allow_filtering: true}, function(err, users){
      if(err) throw err;
        //user is an array of plain objects with only name and age
      var res_data = {
        url:'profile',
        title: 'Profile',
        bodyClass: 'profile',
        success: req.session.success,
        error: req.session.error,
        user_id: req.session.user_id,
        user_fullname: req.session.user_fullname,
        user_email: req.session.user_email,
        user_img: req.session.user_img,
        has_login: true,
        data: users };
        
        res.render('user_settings', res_data);
    });
  } else {
    res.redirect('/');
  }
});

router.post('/userUpload', upload.array('user_img', 10), function(req, res, next) {
    // res.json(req.files);
    // console.log(req.files);
    if (req.session.login) {
        if (req.files.length < 1) {
            res.json({ 'msg': 'No files were uploaded.' });
        } else {
            res.json({ 'file_info': req.files, 'msg': 'Successfully uploaded' });
        }
    } else {
        res.redirect('/');
    }
});


module.exports = router;