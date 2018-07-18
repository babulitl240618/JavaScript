
var adminArra = adist["0"].conversation["0"].participants_admin;

$.each(allUserdata[0].users, function(ky,va){
  $.each(adist["0"].conversation["0"].participants, function(k,v){
    if(va.id === v){
      if(jQuery.inArray(v, adminArra) === -1){
        var mldesign ='<div class="member-div" id="member'+va.id+'">';
          mldesign +='          <img src="/images/users/'+va.img+'" class="member-img">';
          mldesign +='          <div class="member-name">'+va.fullname+'</div>';
          mldesign +='          <div class="member-designation">'+va.designation+'</div>';
          mldesign +='          <img src="/images/remove_8px_200 @1x.png" class="remove-it GroupFlRight" style="margin-top: -5%;" onclick = "removeMember(\'admin\',\''+va.id+'\',\''+getCookie('conversationid')+'\');">';
          mldesign +='          <img src="/images/admin-remove_12px @1x.png" class="remove-admin remove2 GroupFlRight arfImg" style="margin-top: -5.5%;margin-right: 25px;" onclick="makeMember(\''+va.img+'\',\''+va.fullname+'\',\''+va.designation+'\',\''+va.id+'\',\''+getCookie('conversationid')+'\')">';
          mldesign +='          <img src="/images/admin-add_12px @1x.png" class="add-admin add2 GroupFlRight arfImg"  style="margin-top: -5.5%;margin-right: 25px;" onclick="makeAdmin(\''+va.img+'\',\''+va.fullname+'\',\''+va.designation+'\',\''+va.id+'\',\''+getCookie('conversationid')+'\')">';
          mldesign +='        </div>';
          $("#ml-listHl").append(mldesign);
          $("#ml-membertype").show();
      }
    }
  });

  if(adist["0"].conversation["0"].participants_admin !== null){
    $.each(adist["0"].conversation["0"].participants_admin, function(kad,vad){
      if(va.id == vad){
        var mldesign ='<div class="member-div" id="member'+va.id+'">';
            mldesign +='          <img src="/images/users/'+va.img+'" class="member-img">';
            mldesign +='          <div class="member-name">'+va.fullname+'</div>';
            mldesign +='          <div class="member-designation">'+va.designation+'</div>';
            mldesign +='          <img src="/images/remove_8px_200 @1x.png" class="remove-it GroupFlRight" style="margin-top: -5%;" onclick = "removeMember(\'member\',\''+va.id+'\',\''+getCookie('conversationid')+'\');">';
            mldesign +='          <img src="/images/admin-remove_12px @1x.png" class="remove-admin remove2 GroupFlRight arfImg" style="margin-top: -5.5%;margin-right: 25px;" onclick="makeMember(\''+va.img+'\',\''+va.fullname+'\',\''+va.designation+'\',\''+va.id+'\',\''+getCookie('conversationid')+'\')">';
            mldesign +='          <img src="/images/admin-add_12px @1x.png" class="add-admin add2 GroupFlRight arfImg"  style="margin-top: -5.5%;margin-right: 25px;" onclick="makeAdmin(\''+va.img+'\',\''+va.fullname+'\',\''+va.designation+'\',\''+va.id+'\',\''+getCookie('conversationid')+'\')">';
            mldesign +='        </div>';
            $("#ml-listHA").append(mldesign);
            $("#ml-admintype").show();
      }
    });
  }

  var definedList = '<li data-userid = "'+va.id+'" data-userimg = "'+va.img+'"  data-cnv = "'+getCookie('conversationid')+'">';
      definedList += '  <img src="/images/users/'+va.img+'" class="profile">';
      definedList += '  <spna class="name s-l-def-clas">'+va.fullname+'</spna> <spna class="designation-name" data-desig="'+va.designation+'">'+va.designation+'</spna>';
      definedList += '</li>';

  $("#s-l-def").append(definedList);
});

// removeMember function used for delete user from group member list
var removeMember = (targetUser,targetID,conversation_id) => {
  //alert(conversation_id);
  var options =
      {
        priority : 'danger',
        title    : 'Warning',
        message  : 'You can\'t delete this user'
      };
  $.ajax({
      type: 'POST',
      data: {
        conversation_id:conversation_id,
        targetUser:targetUser,
        targetID:targetID
      },
      dataType: 'json',
      url: '/hayven/groupMemberDelete',						
      success: function(data) {
        if(data == 'creator'){
          $.toaster(options);
        }else{
          $("#member"+targetID).remove();
        }
      }
  });
};

$(document).keyup(function(e) {
  if (e.keyCode == 27) { // escape key maps to keycode `27`

    if($(".members-list").is(':visible')){
      close_container();
    }

    if($(".action-btn-div").is(':visible')){
      $(".action-btn").trigger('click');
    }

    if($(".more-option").is(':visible')){
      $(".more-option").hide();
    }

    if($(".emoji_div").is(':visible')){
      $(".emoji_div").remove();
    }

    if($(".reac_div").is(':visible')){
      $(".reac_div").remove();
    }
    if($(".msg_open_more_div").is(':visible')){
      $(".msg_open_more_div").remove();
    }

    $( ".per-msg" ).each(function( k,v ) {
      if($(v).css('z-index') > 1000){
        $(v).removeAttr('style');
      }
      $('.per-msg-action img').attr('src', '/images/NavbarIcons/actions-create_24px_FFF.png');
      $(".backWrap").hide();
    });

    //console.log($('.per-msg ').css('z-index'));
    // if($('.per-msg ').css('z-index') > 1000){
    //   $('.per-msg-action').trigger('click');
    // }
  }
});

/* Suggested member list onkeyup */
$('.add-team-member').on('keyup', function(e){
  var str = $(e.target).val();
  if(str != ""){
    $('.right-part .suggested-type-list').show();
    if(str.indexOf('@') != -1){
      $('.right-part .suggested-type-list li').hide();
      send_email_invite(str);
    }
  } else {
    $('.right-part .suggested-type-list').hide();
  }
});

var searchsldefclas = (value) => {
  // $('.s-l-def-clas:contains(' + value + ')').show();
  // $('.s-l-def-clas:not(:contains(' + value + '))').hide();
  console.log(value);

  if(value){
    $("#s-l-def").show();
    $(".s-l-def-clas").each(function() {
        if ($(this).text().toLowerCase().search(value.toLowerCase()) > -1) {
            $(this).parent('li').show();
        }else {
            $(this).parent('li').hide();
        }
    });
  }else{
    $("#s-l-def").hide();
  }

}

/** Add suggested user list to
    selected group member list */
$('.suggested-list li').on('click', function(){
  var img_src = $(this).find('img').attr('src');
  var name = $(this).find('.name').text();
  var userid = $(this).attr('data-userid');
  var cnvid = $(this).attr('data-cnv');
  var img = $(this).attr('data-userimg');
  var desig = $(this).find('.designation-name').attr('data-desig');
  var groupName = $("#groupname").text();
    $.ajax({
      type: 'POST',
      data: {
        conversation_id:cnvid,
        targetID:userid
      },
      dataType: 'json',
      url: '/hayven/groupMemberAdd',						
      success: function(data) {
        console.log(data);
        group_member_li_draw(name, img, cnvid, userid,desig);

        socket.emit('addNewMeberToGroup', {
          senderName: user_fullname, 
          userID: userid, 
          userName: name, 
          userImg: img,
          cnvID: cnvid, 
          desig: desig,
          groupName: groupName
        });
      }
  });
  $("#addmemberInput").val('');
  $("#s-l-def").hide();
});

/** selected group member list row html */
var group_member_li_draw = (name, img, cnvid, userid,desig) =>{
  var mldesign =' <div class="member-div"  id="member'+userid+'">';
      mldesign +='   <img src="/images/users/'+img+'" class="member-img">';
      mldesign +='   <div class="member-name">'+name+'</div>';
      mldesign +='   <div class="member-designation" style="float:left;"></div>';
      mldesign +=    '<img src="/images/remove_8px_200 @1x.png" class="remove-it GroupFlRight" style="margin-top: 4.5%;" onclick = "removeMember(\'member\',\''+userid+'\',\''+cnvid+'\');">';
      mldesign +='          <img src="/images/admin-remove_12px @1x.png" class="remove-admin remove2 GroupFlRight arfImg" onclick="makeMember(\''+img+'\',\''+name+'\',\''+desig+'\',\''+userid+'\',\''+cnvid+'\')">';
      mldesign +='          <img src="/images/admin-add_12px @1x.png" class="add-admin add2 GroupFlRight arfImg"   onclick="makeAdmin(\''+img+'\',\''+name+'\',\''+desig+'\',\''+userid+'\',\''+cnvid+'\')">';
      mldesign +=' </div>';
  $('.ml-listHl').append(mldesign);
  action_for_selected_member();
  if($('#ml-listHA .member-div').length > 0){
    $("#ml-admintype").show();
  }else{
    $("#ml-admintype").hide();
  }

  if($('#ml-listHl .member-div').length > 0){
    $("#ml-membertype").show();
  }else{
    $("#ml-membertype").hide();
  }
  //$('.no-of-group-members').text($('.selected-group-members li:visible').length);
};

$(".ml-listHl .member-div").mouseenter(function(e) {
  $(this).find('.add-admin').show();
}).mouseleave(function() {
  $(this).find('.add-admin').hide();
});

$(".ml-listHA .member-div").mouseenter(function(e) {
  $(this).find('.remove-admin').show();
}).mouseleave(function() {
  $(this).find('.remove-admin').hide();
});

// makeMember function used for make member as  a member from admin
var makeMember = (img,name,desig,id,cnvid) => {

  $.ajax({
      type: 'POST',
      data: {
        conversation_id:cnvid,
        targetUser:name,
        targetID:id
      },
      dataType: 'json',
      url: '/hayven/makeMember',						
      success: function(data) {
          $("#member"+id).remove();
          var mldesign =' <div class="member-div"  id="member'+id+'">';
              mldesign +='   <img src="/images/users/'+img+'" class="member-img">';
              mldesign +='   <div class="member-name">'+name+'</div>';
              mldesign +='   <div class="member-designation" style="float:left;"></div>';
              mldesign +=    '<img src="/images/remove_8px_200 @1x.png" class="remove-it GroupFlRight" style="margin-top: 4.5%;" onclick = "removeMember(\'member\',\''+id+'\',\''+cnvid+'\');">';
              mldesign +='          <img src="/images/admin-remove_12px @1x.png" class="remove-admin remove2 GroupFlRight arfImg" onclick="makeMember(\''+img+'\',\''+name+'\',\''+desig+'\',\''+id+'\',\''+cnvid+'\')">';
              mldesign +='          <img src="/images/admin-add_12px @1x.png" class="add-admin add2 GroupFlRight arfImg"   onclick="makeAdmin(\''+img+'\',\''+name+'\',\''+desig+'\',\''+id+'\',\''+cnvid+'\')">';
              mldesign +=' </div>';

          $('.ml-listHl').append(mldesign);
          
          $(".ml-listHl .member-div").mouseenter(function(e) {
            $(this).find('.add-admin').show();
          }).mouseleave(function() {
            $(this).find('.add-admin').hide();
          });

          if($('#ml-listHA .member-div').length > 0){
            $("#ml-admintype").show();
          }else{
            $("#ml-admintype").hide();
          }
      
          if($('#ml-listHl .member-div').length > 0){
            $("#ml-membertype").show();
          }else{
            $("#ml-membertype").hide();
          }
      }
  });
};

// makeMember function used for make admin as  a member from member
var makeAdmin = (img,name,desig,id,cnvid) => {
  //alert(conversation_id);
  $.ajax({
      type: 'POST',
      data: {
        conversation_id:cnvid,
        targetUser:name,
        targetID:id
      },
      dataType: 'json',
      url: '/hayven/makeAdmin',						
      success: function(data) {
        $("#member"+id).remove();
        var mldesign =' <div class="member-div"  id="member'+id+'">';
            mldesign +='   <img src="/images/users/'+img+'" class="member-img">';
            mldesign +='   <div class="member-name">'+name+'</div>';
            mldesign +='   <div class="member-designation" style="float:left;"></div>';
            mldesign +=    '<img src="/images/remove_8px_200 @1x.png" class="remove-it GroupFlRight" style="margin-top: 4.5%;" onclick = "removeMember(\'member\',\''+id+'\',\''+cnvid+'\');">';
            mldesign +='          <img src="/images/admin-remove_12px @1x.png" class="remove-admin remove2 GroupFlRight arfImg" onclick="makeMember(\''+img+'\',\''+name+'\',\''+desig+'\',\''+id+'\',\''+cnvid+'\')">';
            mldesign +='          <img src="/images/admin-add_12px @1x.png" class="add-admin add2 GroupFlRight arfImg"   onclick="makeAdmin(\''+img+'\',\''+name+'\',\''+desig+'\',\''+id+'\',\''+cnvid+'\')">';
            mldesign +=' </div>';

        $('.ml-listHA').append(mldesign);
        
        $(".ml-listHA .member-div").mouseenter(function(e) {
          $(this).find('.remove-admin').show();
        }).mouseleave(function() {
          $(this).find('.remove-admin').hide();
        });

        if($('#ml-listHA .member-div').length > 0){
          $("#ml-admintype").show();
        }else{
          $("#ml-admintype").hide();
        }
    
        if($('#ml-listHl .member-div').length > 0){
          $("#ml-membertype").show();
        }else{
          $("#ml-membertype").hide();
        }
      }
  });
};

/** action for selected member list */
var action_for_selected_member = () =>{
  /** On hover into the selected group member list,
      if member is already admin, show the remove admin btn,
      if member is not admin, show the make admin btn */
  $(".ml-listHl .member-div").mouseenter(function(e) {
    $(this).find('.add-admin').show();
  }).mouseleave(function() {
    $(this).find('.add-admin').hide();
  });

  $(".ml-listHA .member-div").mouseenter(function(e) {
    $(this).find('.remove-admin').show();
  }).mouseleave(function() {
    $(this).find('.remove-admin').hide();
  });

  /** When click on the make admin btn,
      admin text show and hide add admin btn */

  // $(".add2").on('click', function(){


  /*
    Remove User from meber list while clicking on remove btn
  */
  $('.remove-it').on('click', function(){
    var name = $(this).find('.name').text();
    memberList.splice(name,1);
    $("#numbers").text(parseInt(memberList.length)+1);
    $(this).closest('li').remove();
  });
};

/* Today add this 12-Jun-2018 */
var add_tag = () =>{
  $('.more-option').hide();
  $('.msg_open_more_div').hide();
  $('.backWrap').css('background-color', 'rgba(0, 0, 0, 0.33)');
  $('.backWrap').show();
  $('.add_tag_div').show();
};

$('.tag_name').on('keyup', function(event){
  var code = event.keyCode || event.which;
  if(code == 186 || code == 188){
    var str = $('.tag_name').val().trim();
    if(str != ""){
      var html =  '<div class="per-tag">';
          html+=    '<span>'+ str.slice(0, -1) +'</span>&nbsp;';
          html+=    '<img src="/images/close_18px_300 @1x.png" onclick="remove_this_tag(event)">';
          html+=  '</div>';
      $('.tag-lists').append(html);
      $('.tag_name').val("").focus();
    }
  }
});

var remove_this_tag = (event) =>{
  $(event.target).closest('.per-tag').remove();
};

$('.add_tag_div .btn-primary').on('click', function(){
  var alltags = $('.per-tag');
  var thismsg = $('.per-msg.active');
  var lenoftag = $.each(alltags, function(k,v){
    var pertag = $(v).find('span').text();
    var html = '<span class="tag-list">'+ pertag +'</span> ';
    if($(thismsg).find('.tags').length == 1){
      $(thismsg).find('.tags').append(html);
    }else{
      $(thismsg).find('.attachment').after('<div class="tags">'+ html +'</div>');
    }
  });
  $(alltags).remove();
  close_pop_div();
});

var share_this_msg = () =>{
  $('.msg_open_more_div').hide();
  $('.backWrap').css('background-color', 'rgba(0, 0, 0, 0.33)');
  $('.backWrap').show();
  $('.share_msg_div').show();
};

var delete_this_msg = (event) =>{
  var msgid = $(event.target).closest('.per-msg').attr('data-msgid');
  $('.msg_open_more_div').hide();
  $('.backWrap').css('background-color', 'rgba(0, 0, 0, 0.33)');
  $('.backWrap').show();
  $('.delete_msg_div').show();
  $('.delete_msg_div').find('.btn-del').attr('data-id', msgid);
};
var delete_commit = (e) =>{
  var msgid = $(e).attr('data-id');
  $.ajax({
    url: '/hayven/commit_msg_delete',
    type: 'POST',
    data: {uid: user_id, msgid: msgid},
    dataType: 'JSON',
    success: function(res){
      console.log(res);
      if(res.status){
        $('.msg_id_'+msgid).hide();
        $('.msg_id_'+msgid).prev('.separetor').hide();
        close_pop_div();
      }
    },
    error: function(err){
      console.log(err.responseText);
    }
  }); 
};
var close_pop_div = () =>{
  $('.backWrap').hide();
  $('.add_tag_div').hide();
  $('.share_msg_div').hide();
  $('.delete_msg_div').hide();
  $('.per-msg').removeClass('active');
};
/* end of 12-Jun-2018 */
