var express = require('express');
var bcrypt = require('bcryptjs');
var FCM = require('fcm-node');
var serverKey = 'AAAAwSuL-Gg:APA91bGQeZg_iF_nu7zWvGq4XfkPKRas5H8T8BVKL3Ve8o5HqKHQh2vMcWZYL4W5kl1fUPqd8osSP4EXNA59Y2QstNSd1S0MoptoXRCusSia1-ql62fapg8NT7tRlAuxBHRnEqeNxE4c'; //put your server key here
var fcm = new FCM(serverKey);
var _ = require('lodash');
var router = express.Router();

var {models} = require('./../config/db/express-cassandra');
var {passwordToHass, passwordToCompare} = require('./../utils/hassing');

/* GET login page. */
router.get('/', function(req, res, next) {
  if(req.session.login){
    res.redirect('/hayven');
  } else {
    res.send('This is android login page');
  }
});

/* POST login listing. */
router.post('/login', function(req, res, next) {
  models.instance.Users.find({}, {raw:true, allow_filtering: true}, function(err, users){
      if(err) throw err;
      //user is an array of plain objects with only name and age
      var alluserlist = [];
      var user = [];
      var msg = '';
      _.each(users, function(v,k){
        alluserlist.push({id: v.id, dept: v.dept, designation: v.designation, email: v.email, fullname: v.fullname, img: v.img});
        
        // Removing the old gcm_id if any
        var query_object = {id: v.id};
        var update_values_object = {gcm_id: null};
        var options = {conditions: {gcm_id: req.body.gcm_id}}; 
        if(req.body.gcm_id == v.gcm_id && req.body.email != v.email){
          models.instance.Users.update(query_object, update_values_object, options, function(err){
              if(err) console.log(err);
              else console.log('Removing the old gcm_id if any');
          }); 
        }
        // End of removing the old gcm_id if any

        if(req.body.email == v.email){
          if(passwordToCompare(req.body.password, v.password)){
            msg = "true";
            user = {id: v.id, dept: v.dept, designation: v.designation, email: v.email, fullname: v.fullname, img: v.img};
            
            query_object = {id: v.id};
            update_values_object = {gcm_id: req.body.gcm_id};
            options = {conditions: {email: req.body.email}};
            models.instance.Users.update(query_object, update_values_object, options, function(err){
                if(err) console.log(err);
                else console.log('Successfully update the gcm id');
            });
          }
          else{
            msg = 'Password does not match';
          }
        }
      });
      if(msg == ""){
        res.send({alluserlist: [], user: [], msg: "Email address is invalid"});
      } 
      else if(msg == "Password does not match"){
        res.send({alluserlist: [], user: [], msg: "Password does not match"});
      }
      else{
        res.send({alluserlist: alluserlist, user: user, msg: msg});
      }
  });
});

/* Send fcm . */
router.post('/fcm-send', function(req, res, next) {
  var sender_id = req.body.sender_id;
  var reciver_id = models.uuidFromString(req.body.reciver_id);
  var call_type = req.body.call_type;
  var msg = req.body.msg;

  models.instance.Users.find({id: reciver_id}, {raw:true, allow_filtering: true}, function(err, user){
      if(err) throw err;
      
      if(user[0].gcm_id != null){
        
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: user[0].gcm_id, 
            collapse_key: 'green',
            
            notification: {
                title: 'Title of your push notification', 
                body: msg 
            },
            
            data: {  //you can send only notification or only data(or include both)
                sender_id: sender_id,
                reciver_id: req.body.reciver_id,
                reciver_token: user[0].gcm_id,
                call_type: call_type,
                msg: msg
            }
        };
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log(err);
            } else {
                res.send({status: "Successfully sent with response: ", response: response, message: message});
            }
        });
      }
      else{
        res.send({status: "user have no gcm id"});
      }
  });
});


module.exports = router;
