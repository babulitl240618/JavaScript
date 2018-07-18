$(function () {

  lightbox_call(); 
  
  /** When click on the action button from Hayven chat page */
  $('.action-btn').on('click', function(){
    if($('.action-btn-div').is(":hidden")){
      $('.action-btn').attr('src', '/images/close_18px_000 @2x.png');
      /*check action btn click from individual chatting page or not*/
      if($(this).closest("div").hasClass('message-send-form')){
        $('.backWrap').show();
        $('.chat-page .message-send-form').css('z-index', '1032');
        $(".btn-cleate-file-upload").show();
      } else {
        $('.action-btn-div-details').hide();
      }
      $(".action-btn-div").slideDown("slow");
    }else{
      if($(this).closest('div').hasClass('message-send-form')){
        $('.backWrap').hide();
        $(".btn-cleate-file-upload").hide();
        $('.chat-page .message-send-form').css('z-index', '0');
      }
      $(".action-btn-div").hide();
      $('.action-btn').attr('src', '/images/NavbarIcons/actions-create_24px_FFF.png');
    }
  });
  /** End of action button process*/

  $('#project-create').on('keyup', function(e){
    var str = $(this).val();
    if(str.length > 0){
      if(e.keyCode == 13){
        console.log($(this).val());
        $("#projectContainer").prepend(randerProject($(this).val()));
        clearingprojectInsert();
      }
    } else {
      clearingprojectInsert();
    }

  });

});
var lightbox_call = () =>{
  $('.lightbox').on('click', function(event){
    if(! $('#lightbox-modal').is(':visible')){
      var is_img = true;
      var download_link = '';
      var src1 = $(event.target).attr('src');
      if(src1 == undefined){
        var src1 =  '/images/file_icon/' + $(event.target).closest('.attach-file').attr('data-filetype') + '.png';
        download_link = $(event.target).closest('.attach-file').attr('data-src');
        is_img = false;
      }
      set_lightbox_img(src1, is_img, download_link);

      var allimg = $(event.target).closest('div.attachment').find('.lightbox');
      $('.lightbox-img-lists').html('');
      var active = '';
      $.each(allimg, function(k,v){
        var is_file = '';
        var alt_val = '';
        if($(v).hasClass('attach-file')){
          var src = '/images/file_icon/' + $(v).attr('data-filetype') + '.png';
          is_file = 'isAfile';
          alt_val = $(v).attr('data-src');
        }
        else{
          var src = $(v).attr('src');
          alt_val = src;
        }
        (src1 == src)? active = 'lightbox-active': active = '';
        var img = '<img class="lightbox-item '+ active +' '+ is_file +'" src="'+ src +'" alt="'+ alt_val +'">';
        $('.lightbox-img-lists').append(img);
      });
      $('#lightbox-modal').show();
      lightbox_item_click();

      $('.lightbox-prev').on('click', function(event){
        var src = $('.lightbox-active').prev('.lightbox-item').attr('src');
        if(src == undefined){
          var src = $('.lightbox-item:last-child').attr('src');
        }
        if($('.lightbox-active').prev('.lightbox-item').hasClass('isAfile')){
          is_img = false;
          download_link = $('.lightbox-active').prev('.lightbox-item').attr('alt');
        } else {
          is_img = true;
          download_link = '';
        }
        set_lightbox_img(src, is_img, download_link);
        change_active_img(src);
      });
      $('.lightbox-next').on('click', function(event){
        var src = $('.lightbox-active').next('.lightbox-item').attr('src');
        if(src == undefined){
          var src = $('.lightbox-item:first-child').attr('src');
        }
        if($('.lightbox-active').next('.lightbox-item').hasClass('isAfile')){
          is_img = false;
          download_link = $('.lightbox-active').next('.lightbox-item').attr('alt');
        } else {
          is_img = true;
          download_link = '';
        }

        set_lightbox_img(src, is_img, download_link);
        change_active_img(src);
      });
    }
  });
}
var lightbox_item_click = () =>{
  $('.lightbox-item').on('click', function(event){
    var src = $(event.target).attr('src');
    var is_img = $(event.target).hasClass('isAfile') ? false: true;
    var download_link = $(event.target).hasClass('isAfile') ? $(event.target).attr('alt'): '';
    set_lightbox_img(src, is_img, download_link);
    change_active_img(src);
  });
};
var set_lightbox_img = (src, is_img, download_link) =>{
  var html = '';
  if(is_img){
    html = '<img src="'+ src +'">';
  } else {
    html =  '<div class="imgbackdiv">';
    html+=    '<img src="/2x'+ src +'">';
    html+=    '<p class="cant-preview">This file can\'t be previewed.</p>';
    html+=    '<p class="lbfile-name">'+ src +'</p>';
    html+=    '<a href="'+ download_link +'" class="btn btn-primary" target="_blank">Download</a>';
    html+=    '<p><a href=# class="learn-more">Learn more</a></p>';
    html+=  '</div>';
  }

  $('.lightbox-slides').html(html);
};
var change_active_img = (src) =>{
  $('.lightbox-item').removeClass('lightbox-active');
  $.each($('.lightbox-item'), function(k, v){
    if($(v).attr('src') == src){
      $(v).addClass('lightbox-active');
    }
  });
}
var closeModal = () => {
  $('#lightbox-modal').hide();
}
/**
 * User click on the logout button
 **/
var open_nav_user_pro = () =>{
  if($('.nav-user-pro').is(':visible')){
    $('.nav-user-pro').hide();
  } else {
    $('.nav-user-pro').show();
  }
}
var logout = () => {
  window.location.assign("/logout");
};

var clearingprojectInsert = () => {
  $('#project-create').val("");
};

var randerProject = (text) => {
    var design = '<div class="inner-group">';
        design += '  <div class="left-panel">';
        design += '    <i class="fas fa-check-circle project-circle"></i>';
        design += '  </div>';
        design += '  <div class="right-panel">';
        design += '    <span>'+text+'</span>';
        design += '  </div>';
        design += '</div>';
    return design;
};


// open project infor form pop up div on clik opnenProjectModel in project deshboard page

var opnenProjectModel = (event) => {
    $("#boxWrap").show();
    $("#modelContainer").html($("#projectInit").html());
    $(".modelDot3").hide();

    var $selects = $('#Workspace');
    $selects.change(function () {
      console.log($(this).val());

      if($(this).val() == ""){
              $(this).css('color','#e7e3e4');
              $('#Workspace').css('background-image','url("/images/svg/SelectedDropdown.svg") !important');
      }
      else{
              $(this).css('color','#000000');
              $('#Workspace').css('background-image','url("/images/svg/SelectedDropdown.svg") !important');
      }
    });

    $selects.each(function(){
      $(this).change();
    });
};


var openTaskOptCentr = (event) => {
    $("#boxWrap").show();
    $("#modelContainer").html($("#taskOptDiv").html());

    $('.firstDiv').each(function(index) {
      var parentwid = parseInt($(this).width());
      var onestwid = parseInt($(this).find('.creatorDiv').width());
      var thirdwid = parseInt($(this).find('.dateDiv').width());
      var thirdwid = parentwid - (onestwid+thirdwid) ;
      $(this).find('.lineDiv').width(thirdwid-15);
    });
};

var closeProjectModel = (event) => {
    $("#boxWrap").hide();
};

var closeTagModel = (event) => {
    $("#tagBoxWrap").hide();
};


var gonextprojectpagination = (fromdiv,todiv) => {
  console.log($("#ProjectName").val());
  if($("#ProjectName").val() != ""){
    if($("#Workspace").val() != ""){

      setCookie('ProjectName', $("#ProjectName").val(), 1);
      setCookie('Workspace', $("#Workspace").val(), 1);
      setCookie('Description', $("#Message").val(), 1);

      $("#modelContainer"+ fromdiv).remove();

      if(todiv == 'projectSetOwner1'){
        $("#modelContainer").html($("#projectSetOwner1").html());
        $(".mask").height('501px');
        $(".pagination2").css('opacity','1');
        $(".pagination1").css('opacity','0.3');

        $("#projectsetownerFormholder").height('450px');
        $("#projectsetownerFormholder").css('overflow-y','auto');
      }else{
          $("#modelContainer").html($("#projectSetOwner").html());
      }


      if(todiv == "projectsetownerFormholder"){
        $(".mask").height('332px');
        $(".pagination2").css('opacity','1');
        $(".pagination1").css('opacity','0.3');
      }
    }else{
      $("#Workspace").css('border','1px solid RED');
    }
  }else{
    $("#ProjectName").css('border','1px solid RED');
  }
};
var golastprojectpagination = (fromdiv,todiv) => {
    $("#modelContainer"+ fromdiv).remove();
    if(todiv == 'projectSetOwner1'){
      $("#modelContainer").html($("#projectSetOwner1").html());
      $(".mask").height('501px');
      $(".pagination2").css('opacity','1');
      $(".pagination1").css('opacity','0.3');

      $("#projectsetownerFormholder").height('459px');
      $("#projectsetownerFormholder").css('overflow-y','scroll');
    }else{
      $("#modelContainer").html($("#projectLastFormHolder").html());
      $(".mask").height('501px');
      $(".pagination2").css('opacity','0.3');
      $(".pagination1").css('opacity','0.3');
      $(".pagination3").css('opacity','1');
    }

};

var goback = (fromdiv,todiv) => {
    $("#modelContainer"+ todiv).remove();
    $("#modelContainer").html($("#projectInit").html());
    if(fromdiv == "projectsetownerFormholder"){
      $(".mask").height('501px');
      $(".pagination2").css('opacity','0.3');
      $(".pagination1").css('opacity','1');
    }
};

// For popup tag div, design in foot.ejs
// ** AM = Assign Members
// ** AG = Assign Guest

var openTagDiv = (e,source) => {
  console.log(e);
  $('#innerMask').css({'left':e.pageX+20,'position':'absolute'});
  $('#tagBoxWrap').show();

  if(source == 'AM'){
    $("#tagCointainer").html($("#tagInfoDiv").html());
  }

  if(source == 'AG'){
    $("#tagCointainer").html($("#tagInfoDiv").html());
  }
}

$("#addSubtaskBtn").on('click', function(e){
  e.preventDefault();
  e.stopPropagation();

  $(".subtaskholder").toggle();


  if($(".subtaskholder").is(":visible")){
    //$(".rotateIcon").removeClass('afterRotare');
    $(".rotateIcon").addClass('afterRotare');
  }else{
    $(".rotateIcon").removeClass('afterRotare');
  }

});

var flagToggle = (e,source) =>{
  e.preventDefault();
  e.stopPropagation();

  if(source == "svgFlagged"){
    $("#svgFlagged").hide();
    $("#svgnflagged").show();
  }else if(source == "svgnflagged"){
    $("#svgnflagged").hide();
    $("#svgFlagged").show();
  }
}


var parseHtmlConentEdit = (event) =>{
  console.log(event);
  $("#parseHtmlConentEdit").attr('contenteditable',true);
  $("#parseHtmlConentEdit").addClass('contentEditDivClass');
  $("#parseHtmlConentEdit").text("..");
  $("#parseHtmlConentEdit").focus();
}

$("#parseHtmlConentEdit").on("blur focusout", function(e){
  $("#parseHtmlConentEdit").attr('contenteditable',false);
  $("#parseHtmlConentEdit").text("Add a section");
  $("#parseHtmlConentEdit").removeClass('contentEditDivClass');

});

$("#parseHtmlConentEdit").on("keyup", function(e){
  if(e.keyCode == 13){
    $("#sectionnaem").text($("#parseHtmlConentEdit").text());
    $("#parseHtmlConentEdit").attr('contenteditable',false);
    $("#parseHtmlConentEdit").text("Add a section");
    $("#parseHtmlConentEdit").removeClass('contentEditDivClass');
  }
});


var menulistToggle = () =>{
  $('.menuList').toggle();

}



// afterAppendEvent();

$("div").delegate("#datepdView2", "click", function(e){
    e.preventDefault();
    e.stopPropagation();
});


$("div").delegate("#dotodot", "click", function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.menuListTT').toggle();
});

$("div").delegate(".project-description", "click", function(e){


  console.log($("#pdrotate").hasClass('afterRotare'));

  if($("#pdrotate").hasClass('afterRotare')){
    $("#pdrotate").removeClass('afterRotare');
  }else{
    $("#pdrotate").addClass('afterRotare');
  }
});

$("div").delegate(".tgs", "click", function(e){
  console.log($("#tgsrotate").hasClass('afterRotare'));

  if($("#tgsrotate").hasClass('afterRotare')){
    $("#tgsrotate").removeClass('afterRotare');
  }else{
    $("#tgsrotate").addClass('afterRotare');
  }

});

$("div").delegate(".coon", "click", function(e){
  console.log($("#coonrotate").hasClass('afterRotare'));
  if($("#coonrotate").hasClass('afterRotare')){
    $("#coonrotate").removeClass('afterRotare');
  }else{
    $("#coonrotate").addClass('afterRotare');
  }
});

$("div").delegate(".pinnedToggle", "click", function(e){
  e.preventDefault();
  e.stopPropagation();

  var NewDesign = $("#"+e.target.id+"-in").html();
  $("#"+e.target.id+"-in").remove();

  if(e.target.attributes[4].nodeValue == "P"){
    $("#projectContainer").append('<div class="inner-group" id="'+e.target.id+'-in">'+NewDesign+'</div>');
    $("#"+e.target.id).attr("src","/images/svg/NotPinned.svg");
    $("#"+e.target.id).attr("data-ttle","NP");

  }

  if(e.target.attributes[4].nodeValue == "NP"){
    $("#pinnedContainer").append('<div class="inner-group" id="'+e.target.id+'-in">'+NewDesign+'</div>');
    $("#"+e.target.id).attr("src","/images/svg/Pinned.svg");
    $("#"+e.target.id).attr("data-ttle","P");
  }

  var numItemsPin = $('#projectContainer .inner-group').length;
  var numItemsNPin = $('#pinnedContainer .inner-group').length;

  $("#pinProjectCount").text(numItemsNPin);
  $("#projectCount").text(numItemsPin);


});

$(document).mouseup(function(e)
{
    var container = $('.menuList');

    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }


    var menuListTT = $('.menuListTT');

    if (!menuListTT.is(e.target) && menuListTT.has(e.target).length === 0)
    {
        menuListTT.hide();
    }

    var menuListPD = $('.menuListPD');

    if (!menuListPD.is(e.target) && menuListPD.has(e.target).length === 0)
    {
        menuListPD.hide();
    }
});



$(function () {
    $('.tooltip').tooltipster();
});

var membersAdd = () =>{
    var checkBox = document.getElementById("checkbox8");
    console.log(checkBox);
    var text = document.getElementById("entryArea");
    if (checkBox.checked == true){
      text.style.display = "none";
    } else {

      text.style.display = "block";
    }
}

// text replace on focus in new task add project detail page

$("#addingtaskInput").on("focusin", function(e){
    $("#addingtaskInput").val('');
});


// Floting Satus UL

$("div").delegate(".statusOnClick", "click", function(e){
    e.preventDefault();
    e.stopPropagation();
    $("#boxWrap").hide();
    $('#flotingUL').css({'left':e.pageX-120,'top':e.pageY+20,'position':'absolute'});
    $('#flotingUL').toggle();
    $("#forStatusBtn").val(e.target.id);
});

// Floting Satus UL



var statusChange = (title,color) => {
  var idName = $("#forStatusBtn").val();

  $("#"+idName).text(title);
  $("#"+idName).css('color','#'+color);

  if(title == "Completed"){
    $("#"+idName).css('background-color','rgba(19, 254, 56, 0.2)');
    $("#"+idName).css('font-size','14px');
    $("#"+idName+"LP").css('border-left','4px solid #E3E3E3');
    $("#"+idName+"Img").attr('src','/images/svg/Completed.svg');

    $("#"+idName+"Title").text($("#"+idName+"Title").text());
    $("#"+idName+"Title").css('color','rgba(0,0,0,0.86) !important');
  }

  if(title == "Awaiting Feedback"){
    $("#"+idName).css('background-color','rgba(245, 166, 35, 0.2)');
    $("#"+idName).css('font-size','10px');
    $("#"+idName+"LP").css('border-left','4px solid  #'+color);
    $("#"+idName+"Img").attr('src','/images/svg/Idle.svg');

    $("#"+idName+"Title").text($("#"+idName+"Title").text());
    $("#"+idName+"Title").css('color','rgba(0,0,0,0.86) !important');
  }

  if(title == "On Hold"){
    $("#"+idName).css('background-color','rgba(144, 19, 254, 0.2)');
    $("#"+idName).css('font-size','14px');
    $("#"+idName+"LP").css('border-left','4px solid  #'+color);
    $("#"+idName+"Img").attr('src','/images/svg/Idle.svg');

    $("#"+idName+"Title").text($("#"+idName+"Title").text());
    $("#"+idName+"Title").css('color','rgba(0,0,0,0.86) !important');
  }

  if(title == "Cancelled"){
    $("#"+idName).css('background-color','rgb(224, 60, 49, 0.2)');
    $("#"+idName).css('font-size','14px');
    $("#"+idName+"LP").css('border-left','4px solid  #ffffff');
    $("#"+idName+"Img").attr('src','/images/svg/Canceled.svg');
    $("#"+idName+"Title").html('<strike>'+$("#"+idName+"Title").text()+'</strike>');
    $("#"+idName+"Title").css('color','#E03C31 !important');
  }

  if(title == "In Progress"){
    $("#"+idName).css('background-color','rgba(74, 144, 226, 0.2)');
    $("#"+idName).css('font-size','14px');
    $("#"+idName+"LP").css('border-left','4px solid  #'+color);
    $("#"+idName+"Img").attr('src','/images/svg/Idle.svg');

    $("#"+idName+"Title").text($("#"+idName+"Title").text());
    $("#"+idName+"Title").css('color','rgba(0,0,0,0.86) !important');
  }

  $('#flotingUL').toggle();
}

var activityAction = (action) =>{

  var idName = $("#forMoremenyTaask").val();
  // alert(idName);
  var strArray = idName.match(/(\d+)/g);
  var listGroup = $(".listGroup").length;
  console.log(strArray[0]);
  console.log();

  if(action== 'DT'){
    $("#tasklistcontainer").append('<div class="listGroup" id="menulistPDToggle'+(1+parseInt(listGroup))+'LG">'+$("#"+idName+"LG").html()+"</div>");
    $('#taskMenuList').toggle();
    $('#menulistPDToggle'+(1+parseInt(listGroup))+'LG').find('.MoremenuOnClick').attr('id','menulistPDToggle'+(1+parseInt(listGroup)))
  }

  if(action== 'DLT'){
    $("#"+idName+"LG").remove();
    $('#taskMenuList').toggle();
  }

}

var activityActionST = (action) =>{

  var idName = $("#forMoremenySubTask").val();
  // alert(idName);
  var strArray = idName.match(/(\d+)/g);
  var listGroup = $(".subtask1").length;

  if(action== 'DT'){
    $("#subtasklistConaiter").append('<div class="listGroup subtask1" id="menulistSUBToggle'+(1+parseInt(listGroup))+'LG">'+$("#"+idName+"LG").html()+"</div>");
    $('#subtaskMenuList').toggle();
    $('#menulistSUBToggle'+(1+parseInt(listGroup))+'LG').find('.stMoremenuOnClick').attr('id','menulistSUBToggle'+(1+parseInt(listGroup)));
    $(".subtaskcount1").text($(".subtask1").length);
  }

  if(action== 'DLT'){
    $("#"+idName+"LG").remove();
    $('#subtaskMenuList').toggle();
    $(".subtaskcount1").text($(".subtask1").length);
  }

}




var searchCoOwner = (value) => {
  $('.coulst:contains(' + value + ')').show();
  $('.coulst:not(:contains(' + value + '))').hide();
  // $(".coulst").each(function() {
  //     if ($(this).text().search(value) > -1) {
  //         $(this).show();
  //
  //     }
  //     else {
  //         $(this).hide();
  //     }
  // });
}
var searchTags = (value) => {
  $('.tagulst:contains(' + value + ')').show();
  $('.tagulst:not(:contains(' + value + '))').hide();
}


var tagUserr = [];
var setCown = (img,email,name,id) => {
  console.log(tagUserr);
  if(jQuery.inArray(id, tagUserr) !== -1){
    tagUserr.splice(id,1);
    $('#tagUserr'+id).remove();
    $("#coownerCount").text($('.tagDiv').length);
    $('#users').hide();
    $('#coowner').val("");
  }else{
    tagUserr.push(id);
    var design = '<div class="tagDiv" id="tagUserr'+id+'">';
        design +='    <div class="tagImgle">';
        design +='      <img src="/images/users/'+img+'" title="Mahfuz"  class="tagImge" />';
        design +='    </div>';
        design +='    <div class="tagImgMid" style="width:82%;">';
        design +='      <span class="tagtile">'+name+'</span>';
        design +='      <span class="tagemail">'+email+'</span>';
        design +='    </div>';
        design +='    <div class="tagImgRi">';
        design +='      <img src="/images/svg/RemoveCoOwners.svg" >';
        design +='    </div>';
        design +='  </div>';

      $("#tagDivHolder").append(design);
      $('#users').hide();
      $('#coowner').val("");
      $("#coownerCount").text($('.tagDiv').length);
      
  }

}


var tagUserr = [];
var setCown = (img,email,name,id) => {
  console.log(tagUserr);
  if(jQuery.inArray(id, tagUserr) !== -1){
    tagUserr.splice(id,1);
    $('#tagUserr'+id).remove();
    $("#coownerCount").text($('.tagDiv').length);
    $('#users').hide();
    $('#coowner').val("");
  }else{
    var pathname = window.location.pathname;
    console.log(pathname);
    if(pathname != '/projects/p-d-c/1'){
      tagUserr.push(id);
    }

    var design = '<div class="tagDiv ckkiTag" id="tagUserr'+id+'">';
        design +='    <div class="tagImgle">';
        design +='      <img src="/images/users/'+img+'" title="Mahfuz"  class="tagImge" />';
        design +='    </div>';
        design +='    <div class="tagImgMid" style="width:82%;">';
        design +='      <span class="tagtile">'+name+'</span>';
        design +='      <span class="tagemail">'+email+'</span>';
        design +='    </div>';
        design +='    <div class="tagImgRi">';
        design +='      <img src="/images/svg/RemoveCoOwners.svg" >';
        design +='    </div>';
        design +='  </div>';

      $("#tagDivHolder").append(design);
      $('#users').hide();
      $('#coowner').val("");
      $("#coownerCount").text($('.tagDiv').length);
      $("#tags-3").text("("+$('.ckkiTag').length+")");
      setCookie('tagUserr',tagUserr,1);
      getCookie('tagUserr');
  }

}

var TaggedArray = [];

var setTagsCPM = (name,id) =>{


  if(jQuery.inArray(id, TaggedArray) !== -1){

    TaggedArray.splice(id,1);
    $('#tagged'+id).remove();
    $("#coownerCount").text($('.tagDiv').length);
    $('#users').hide();
    $('#coowner').val("");

  }else{
    TaggedArray.push(id);
    var design = '<span class="tagClassName" id="tagged'+id+'">';
        design +='    <span class="public-relations">'+name+'</span>';
        design +='    <span><img class="removePublicTag" src="/images/close_20px_700 @1x.png"/></span>';
        design +='  </span>';
    $("#CreateModalTagHolder").append(design);
    $("#PDCTagHolder").append(design);
    $('#tagslist').hide();
    $('#tags').val("");

    setCookie('TaggedArray',TaggedArray,1);
    getCookie('TaggedArray');
  }

}

 var makeActive = (id) =>{
   $('.lasthovershape').removeClass('lasthovershapActive');
   $("#"+id).addClass('lasthovershapActive');
 }


/**
 * Scroll to bottom
 **/
var scrollToBottom = (target) => {
  $('html, body').animate({scrollTop: $(target).prop("scrollHeight")}, 800);
};
