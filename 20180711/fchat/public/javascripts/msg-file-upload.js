var add_file_data = (data) =>{
  filedata = [];
  audiofile = [];
  videofile = [];
  imgfile = [];
  otherfile = [];
  $.each(data, function(k,v){
    var mime = v.mimetype;
    if(mime.indexOf('image') != -1)
      imgfile.push(v.filename);
    else if(mime.indexOf('video') != -1)
      videofile.push(v.filename);
    else if(mime.indexOf('audio') != -1)
      audiofile.push(v.filename);
    else 
      otherfile.push(v.filename);
  });
  filedata = [{audiofile, imgfile, otherfile, videofile}];
};
var submit_form_data = () =>{
  // var data = new FormData();
  // $.each($('#msg_file')[0].files, function(i, file) {
  //     data.append('attach_file', file);
  // });
  // var form = $('#message-form')[0];
  var formData = new FormData($('#message-form')[0]);
  $.ajax({
      xhr: function() {
        $('.progress').show();
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                var percom = Math.ceil(percentComplete*100) - 1;
                // console.log(percom);
                $(".progress-bar").html(percom+"%");
                $(".progress-bar").css("width", percom+"%");
                $(".progress-bar").attr("aria-valuenow", percom);
            }
        }, false);
        return xhr;
      },
      url: '/hayven/send_message',
      type: "POST",
      data: formData,
      dataType: 'json',
      contentType: false,
      processData: false,
      success: function(res){
        if(res.file_info.length){
          $('.progress').hide();
          add_file_data(res.file_info);
          $('#message-form .action-btn').trigger('click');
          $('#msg').html(res.file_info.length + " file/s attached.");
          $('#msg').focus();
        }else{
          alert(res.msg);
        }
      }
  });
};