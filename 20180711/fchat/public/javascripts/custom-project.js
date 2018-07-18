

// Prepend taskbox from specific section in kanban mode
$("#inputTaskType1").on("keyup", function(e){
    if(e.keyCode == 13){
        var design = '<div class="listGroup">';
            design += '  <div class="inner-group" style="border-left: 4px solid #ffffff">';
            design += '      <p>'+$("#inputTaskType1").val()+'</p>';
            design += '      <div class="optPart col-lg-12">';
            design += '          <div class="infoPart">';
            design += '              <div class="taskPrt">';
            design += '              </div>';
            design += '              <div class="comPrt">';
            design += '              </div>';
            design += '              <div class="statusPrt">';
            design += '              </div>';
            design += '              <div class="flagPrt">';
            design += '                  <svg width="24px" height="24px" class="flagged fltRight" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svgnflagged" onclick="flagToggle(event,\'svgnflagged\')">';
            design += '                      <g id="Not-Flagged" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.3">';
            design += '                          <path d="M16.3769322,13.0646 L14.4965193,10 L16.3947998,6.906 C16.4326947,6.8442 16.4346582,6.7666 16.4001011,6.703 C16.3653478,6.6394 16.299768,6.6 16.2282977,6.6 L7.39269352,6.6 L7.39269352,6.2 C7.39269352,6.0894 7.30492652,6 7.19634676,6 C7.087767,6 7,6.0894 7,6.2 L7,6.8 L7,12.6 L7,13.2 L7,17.8 C7,17.9106 7.087767,18 7.19634676,18 C7.30492652,18 7.39269352,17.9106 7.39269352,17.8 L7.39269352,13.4 L16.2282977,13.4 C16.3408044,13.4 16.4285714,13.3106 16.4285714,13.2 C16.4285714,13.1478 16.4089368,13.1004 16.3769322,13.0646 Z" id="Shape-Copy-4" stroke="#90A4AE" stroke-width="2" fill-rule="nonzero"></path>';
            design += '                      </g>';
            design += '                   </svg>';
            design += '                </div>';
            design += '            </div>';
            design += '        </div>';
            design += '   </div>';
            design += '</div>';

            $(".tasklistcontainer-fst").prepend(design);
            $("#inputTaskType1").val('');
    }
});

// toggle activity div on btn click

var activityListToggle = () =>{
  $("#activityUpdate").toggle('slow');
  if( $("#activityUpdate").is(":visible")){
    $(".dowbIcon").addClass('afterRotare');
  }else{
    $(".dowbIcon").removeClass('afterRotare');
  }
}

var subtaskExpand =()=>{

    if( $("#taskOptDivHolder").is(":visible")){
        $("#taskOptDivHolder").slideUp('slow');
        $("#lowerPanelKn").css('margin-top','-5%');
        $(".modelCloseBtn").hide();
        $(".modelDot3").hide();
        $("#etext").text('Collapse');
        $(".inlinefa").addClass('afterRotare');

    }else{
        $("#taskOptDivHolder").slideDown('slow');
        $("#lowerPanelKn").css('margin-top','0%');
        $("#etext").text('Expand');
        $(".modelCloseBtn").show();
        $(".modelDot3").show();
        $(".inlinefa").removeClass('afterRotare');

    }
}


// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


var openTaskOptCentrKNBN = (event) => {
    $("#boxWrap").show();
    $("#modelContainer").html($("#taskOptDiv").html());

    if(isFirefox){
        $("#mask").css('height','618px');
    }

    $('.firstDiv').each(function(index) {
      var parentwid = parseInt($(this).width());
      var onestwid = parseInt($(this).find('.creatorDiv').width());
      var thirdwid = parseInt($(this).find('.dateDiv').width());
      var thirdwid = parentwid - (onestwid+thirdwid) ;
      $(this).find('.lineDiv').width(thirdwid-15);
    });
};


var changeDateFormat = (val) =>{
    $("#dueDateKNBN").val(moment(val).format("MMM, Mo"));
}


var openKNBNTagDiv = (e,source) => {
  console.log(e);
  $('#innerMask').css({'left':e.pageX-340,'top':e.pageY+20,'position':'absolute'});
  $('#tagBoxWrap').show();
  $('.modelCloseBtn').show();

  if(source == 'AM'){
    $("#tagCointainer").html($("#tagInfoDiv").html());
    $(".innerMask").css('height','275px');
  }

  if(source == 'BL'){
    $("#tagCointainer").html($("#tagInfoDivBLANK").html());
    $(".innerMask").css('height','125px');
  }
}

$("#knbnsubtasklistcoaintainer").delegate(".openKNBNTagDiv", "click", function(e){
    e.preventDefault();
    e.stopPropagation();
    $('#innerMask').css({'left':e.pageX-340,'top':e.pageY+20,'position':'absolute'});
    $('#tagBoxWrap').show();
    $('.modelCloseBtn').show();
});

$("#taskInsertBox").delegate("#filterbtnPD", "click", function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.rectangle-13-control').toggle();
    $('.rectangle-13-control').css({'left':e.pageX+20});
});


$("#knbnsubtasklistcoaintainer").delegate(".menulistKNBNToggle", "click", function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.menuListPDKNBN').css({'left':e.pageX-120,'top':e.pageY+20,'position':'absolute'});
    $('.menuListPDKNBN').toggle();
});


$("#addingsubtasktaskInput").on("keyup", function(e){
  if(e.keyCode == 13){
    var listGroup = $(".subtask1").length;
    var design = '<div class="listGroup subtask1" id="menulistSUBToggle'+(1+parseInt(listGroup))+'LG">';
        design += '          <div class="inner-group" onclick="openTaskOptCentr(this);">';
        design += '          <div class="left-panel" style="border-left: 4px solid #F5A623;">';
        design += '            <i class="fas fa-check-circle project-circle"></i>';
        design += '          </div>';
        design += '          <div class="right-panel">';
        design += '            <span>'+$("#addingsubtasktaskInput").val()+'</span>';
        design += '          </div>';
        design += '          <div class="pin-panel">';
        design += '            <img src="/images/svg/MoreMenu.svg" id="menulistSUBToggle'+(1+parseInt(listGroup))+'" class="fltRight stMoremenuOnClick" style="width:24px;height:24px;">';
        design += '            <svg width="24px" height="24px" class="fltRight" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
        design += '               <g id="Not-Flagged" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.3">';
        design += '                    <path d="M16.3769322,13.0646 L14.4965193,10 L16.3947998,6.906 C16.4326947,6.8442 16.4346582,6.7666 16.4001011,6.703 C16.3653478,6.6394 16.299768,6.6 16.2282977,6.6 L7.39269352,6.6 L7.39269352,6.2 C7.39269352,6.0894 7.30492652,6 7.19634676,6 C7.087767,6 7,6.0894 7,6.2 L7,6.8 L7,12.6 L7,13.2 L7,17.8 C7,17.9106 7.087767,18 7.19634676,18 C7.30492652,18 7.39269352,17.9106 7.39269352,17.8 L7.39269352,13.4 L16.2282977,13.4 C16.3408044,13.4 16.4285714,13.3106 16.4285714,13.2 C16.4285714,13.1478 16.4089368,13.1004 16.3769322,13.0646 Z" id="Shape-Copy-4" stroke="#90A4AE" stroke-width="2" fill-rule="nonzero"></path>';
        design += '                </g>';
        design += '            </svg>';
        design += '            <span class="subtaskBtn rectangle-3-3-5 statusOnClick"  id="statusBtn2">On Hold</span>';
        design += '            <input class="subtaskBtn rectangle-3-copy-3-5" type="text" id="datepdView'+listGroup+'" name="datepdView" value="Feb. 7th">';
        design += '            <script type="text/javascript">';
        design += '                    $(function () {';
        design += '                        $("#datepdView'+listGroup+'").datetimepicker({';
        design += '                            format: "MMM, Do"';
        design += '                        });';
        design += '              });';
        design += '            </script>';
        design += '          </div>';
        design += '        </div>';
        design += '        </div>';


    // $("#newTasktasklistcontainer").show();
    $("#subtasklistConaiter").prepend(design);
    $("#addingsubtasktaskInput").val('');
    $(".subtaskcount1").text($(".subtask1").length);

    afterAppendEvent();

  }
});

//
// create task on enter button press in project detail page
//

$("#addingtaskInput").on("keyup", function(e){

  if(e.keyCode == 13){
    var tcl =  $(".t-c-n").length
    var design = '<div class="listGroup t-c-n" id="menulistPDToggle'+tcl+'LG">';
        design += '          <div class="inner-group" onclick="openTaskOptCentr(this);">';
        design += '            <div class="left-panel" id="statusBtn1LP" style="border-left: 4px solid #ff0000;">';
        design += '              <img id="statusBtn1Img" class="project-circlePL" src="/images/svg/Idle.svg">';
        design += '            </div>';
        design += '            <div class="right-panel">';
        design += '              <span id="statusBtn1Title">'+$("#addingtaskInput").val()+'</span>';
        design += '            </div>';
        design += '            <div class="pin-panel">';
        design += '              <div class="hidedivforpdcointainer">';
        design += '                <div class="hidedivforpd">';
        design += '                  <img src="/images/svg/MoreMenu.svg" id="menulistPDToggle'+tcl+'" class="fltRight MoremenuOnClick" style="width:24px;height:24px;">';
        design += '                  <img src="/images/svg/NotFlagged.svg" class="nflagged fltRight" style="width:24px;height:24px;" />';
        design += '                  <img src="/images/svg/Flagged.svg" class="flagged fltRight" style="width:24px;height:24px;" />';
        design += '                  <span class="subtaskBtn">';
        design += '                    <span class="subtaskBtn addSubtaskBtn" id="addSubtaskBtn'+tcl+'">';
        design += '                      <span class="subtaskBtnTitle"><span class="subtaskcount1"></span> Subtasks <i class="fas fa-angle-down rotateIcon"></i></span>';
        design += '                    </span>';
        design += '                  </span>';
        design += '                </div>';
        design += '              </div>';
        design += '              <span class="subtaskBtn rectangle-3-3-6 statusOnClick" id="statusBtn'+tcl+'" >On Hold</span>';
        design += '              <input class="subtaskBtn rectangle-3-copy-3-5" type="text" id="datepdView" name="datepdView" value="Feb. 7th">';
        design += '              <script type="text/javascript">';
        design += '              $(function () {';
        design += '                $("#datepdView").datetimepicker({';
        design += '                  format: "MMM, Do"';
        design += '                });';
        design += '              });';
        design += '              </script>';
        design += '            </div>';
        design += '          </div>';
        design += '          <div class="subtaskholder" id="addSubtaskBtn'+tcl+'Holder">';
        design += '            <div class="input-group">';
        design += '              <div class="input-group-prepend">';
        design += '                <span class="input-group-text">';
        design += '                  <img src="/images/svg/CreateProject2.svg" style="width:24px;height:24px;"/>';
        design += '                </span>';
        design += '              </div>';
        design += '              <input class="form-control" id="addingsubtasktaskInput" placeholder="Start adding sub task" id="project-create" >';
        design += '            </div>';
        design += '            <div id="subtasklistConaiter">';
        design += '            </div>';
        design += '          </div>';
        design += '        </div>';

    $("#newTasktasklistcontainer").show();
    $("#newTasktasklistcontainer").prepend(design);
    $("#addingtaskInput").val('');
    $("#t-p25").text($(".t-c-n").length);

    afterAppendEvent();

  }
});
$("div").on("click", ".MoremenuOnClick", function(e){
    e.preventDefault();
    e.stopPropagation();
    $("#boxWrap").hide();
    $('#taskMenuList').css({'left':e.pageX-120,'top':e.pageY+20,'position':'absolute'});
    $('#taskMenuList').toggle();
    $('#forMoremenyTaask').val(e.target.id);
});

$("div").on("click", ".stMoremenuOnClick", function(e){
    e.preventDefault();
    e.stopPropagation();
    $("#boxWrap").hide();
    $('#subtaskMenuList').css({'left':e.pageX-120,'top':e.pageY+20,'position':'absolute'});
    $('#subtaskMenuList').toggle();
    $('#forMoremenySubTask').val(e.target.id);
});

var afterAppendEvent = () =>{
  $("div").delegate(".subtaskBtn", "click", function(e){
      e.preventDefault();
      e.stopPropagation();
      $("#boxWrap").hide();
  });

  $("div").delegate(".statusOnClick", "click", function(e){
      e.preventDefault();
      e.stopPropagation();
      $("#boxWrap").hide();
      $('#flotingUL').css({'left':e.pageX-120,'top':e.pageY+20,'position':'absolute'});
      $('#flotingUL').toggle();
      $("#forStatusBtn").val(e.target.id);
  });

  $("div").on("click", ".MoremenuOnClick", function(e){
      e.preventDefault();
      e.stopPropagation();
      $("#boxWrap").hide();
      $('#taskMenuList').css({'left':e.pageX-120,'top':e.pageY+20,'position':'absolute'});
      $('#taskMenuList').toggle();
      $('#forMoremenyTaask').val(e.target.id);
  });

  $("div").on("click", ".stMoremenuOnClick", function(e){
      e.preventDefault();
      e.stopPropagation();
      $("#boxWrap").hide();
      $('#subtaskMenuList').css({'left':e.pageX-120,'top':e.pageY+20,'position':'absolute'});
      $('#subtaskMenuList').toggle();
      $('#forMoremenySubTask').val(e.target.id);
  });

  $(".addSubtaskBtn").on('click', function(e){

    e.preventDefault();
    e.stopPropagation();

    var tcl = e.target.id;
    $("#"+tcl+"Holder").toggle();

    if($("#"+tcl+"Holder").is(":visible")){
      //$(".rotateIcon").removeClass('afterRotare');
      $(".rotateIcon").addClass('afterRotare');
    }else{
      $(".rotateIcon").removeClass('afterRotare');
    }

  });
}