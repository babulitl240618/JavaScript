var add_file_data = (data) => {
    var image_data = [];
    // audiofile = [];
    // videofile = [];
    var imgfile = [];
    // otherfile = [];
    // $.each(data, function(k, v) {
    //     var mime = v.mimetype;
    //     if (mime.indexOf('image') != -1)
    //         imgfile.push(v.filename);
    //     else if (mime.indexOf('video') != -1)
    //         videofile.push(v.filename);
    //     else if (mime.indexOf('audio') != -1)
    //         audiofile.push(v.filename);
    //     else
    //         otherfile.push(v.filename);
    // });
    $.each(data, function(k, v) {
        var mime = v.mimetype;
        if (mime.indexOf('image') != -1)
            imgfile.push(v.filename);

    });
    // filedata = [{ audiofile, imgfile, otherfile, videofile }];
    image_data = [{ imgfile }];
};

var submit_personal_data = (e) => {
    e.preventDefault();

    var formData = new FormData($('#frm_personalInfo')[0]);
    console.log("helo");
    $.ajax({

        xhr: function() {

            $('.upload-btn-wrapper .progress').show();
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress ", function(evt) {

                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    var percom = Math.ceil(percentComplete * 100) - 1;
                    // console.log(percom);
                    $(".upload-btn-wrapper .progress .progress-bar").html(percom + "%");
                    $(".upload-btn-wrapper .progress .progress-bar").css("width", percom + "%");
                    $(".upload-btn-wrapper .progress.progress-bar").attr("aria-valuenow", percom);
                }
            }, false);
            return xhr;
        },
        url: '/user_settings/userUpload',
        type: "POST",
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function(res) {
            if (res.file_info.length) {
                $('.progress').hide();
                add_file_data(res.file_info);
                // $('#message-form .action-btn').trigger('click');
                $(' .upload-btn-wrapper .filebtn').trigger('click');
                // $('#userMsg').html(res.file_info.length + " file/s attached.");
                $('#userMsg').html(" Profile picture updated");
                $('#userMsg').focus();
                setTimeout(function() { $("#userMsg").hide(); }, 3000);
            } else {
                alert(res.msg);
            }
        }
    });
    // return false;
};