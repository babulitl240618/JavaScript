var app = require('express');
// var cassandra = require('cassandra-driver');
var router = app.Router();

var {models} = require('./../config/db/express-cassandra');

var getActiveUsers = (callback) =>{
  models.instance.Users.find({is_delete: 0}, {raw:true, allow_filtering: true}, function(err, users){
    if(err){
      callback({status: false, err: err});
    }else{
      callback({status: true, users: users});
    }
  });
};


module.exports = {getActiveUsers};
