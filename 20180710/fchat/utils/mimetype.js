var app = require('express');
var router = app.Router();

var file2mimetype = (mime) => {
  if(mime.indexOf('image') != -1)
    return 'image';
  else if(mime.indexOf('video') != -1)
    return 'video';
  else if(mime.indexOf('audio') != -1)
    return 'audio';
  else 
    return 'other';

};

module.exports = {file2mimetype};
