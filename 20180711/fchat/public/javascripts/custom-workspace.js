  // WS pop up script

  // create new user
    $('#ws-createNewUser-btn').on('click', function(event){
    $("#wsCreateBackWrap").show();
  });

    $('#ws-create-user-popup-close').on('click', function(event){
    $("#wsCreateBackWrap").hide();
  });
  // create new user

  // add new user

    $('#Add-a-New-User').on('click', function(event){
    $("#AddUserBackWrap").show();
  });
    $('#ws-add-user-popup-close').on('click', function(event){
    $("#AddUserBackWrap").hide();
  });

  // add new user

// edit Team Permission
    $('#Edit-Team-Permission').on('click', function(event){
    $("#Team-All-Permission").show();
  });
    $('#ws-edit-team-permission-popup-close').on('click', function(event){
    $("#Team-All-Permission").hide();
  });
// edit Team Permission

//ws management Delete team


    $('#Delete-single-team-ws').on('click', function(event){
    $("#DeleteTeamBackWrap").show();
  });

    $('#ws-Delete-Team-popup-close').on('click', function(event){
    $("#DeleteTeamBackWrap").hide();
  });

//ws management Delete team

$('.ws-profile-name').on('click', function(event){
  $("#UserProfileName").text($(this).closest('tr').find('td:nth-child(1)').text());
  $("#UserProfileEmail").text($(this).closest('tr').find('td:nth-child(4)').text());
  $("#UserProfileUserName").text($(this).closest('tr').find('td:nth-child(2)').text());
  $("#ws-user-management-table").hide();
  $("#ws-user-profile-page").show(); 
});


  $('#back-to-user-management').on('click', function(event){
    $("#ws-user-management-table").show();
    $("#ws-user-profile-page").hide();
  });


   $('.ws_team_name').on('click', function(event){
    $("#ws_all_team").hide();
    $("#ws-team-details").show();
  });

   $('#ws-team-details-to-back-team').on('click', function(event){
    $("#ws-team-details").hide();
    $("#ws_all_team").show();
  });

   $('#ws-channels').on('click', function(event){
    $("#ws-all-channel").hide();
    $("#ws-channels-details").show();
  });

   $('#ws-channels-details-to-back-channels').on('click', function(event){
    $("#ws-channels-details").hide();
    $("#ws-all-channel").show();
  });


//create team pop up start

 $('.add_teams').on('click', function(event){
  $("#Create-TeamBackWrap").show();
});


 $('#ws-create-team-popup-close').on('click', function(event){
  $("#Create-TeamBackWrap").hide();
});

 //choice color pop up start
 $('#Color-Management').on('click', function(event){
  $("#ChoiceColorBackWrap").show();
});
 $('#ws-Color-Manage-popup-close').on('click', function(event){
  $("#ChoiceColorBackWrap").hide();
});

//create team pop up end



 // Checkbox Select script start



$(document).ready(function(){
  $(".HoverCheckbox").change(function(){
       var selected = $('.HoverCheckbox:checked').length;
       if(selected < 0 ){
          $('#DownloadSelectFile').hide();
       }else if(selected > 0 ){
          $('#DownloadSelectFile').show();
       }else{
        $('#DownloadSelectFile').hide();
       }   
    });
});


$('.download-cancel').click(function(){
  $('#DownloadSelectFile').hide();
});


$(document).ready(function () {
  $('#SelectAllCheckbox').on('click', function () {
    $(this).closest('table').find('tbody :checkbox')
      .prop('checked', this.checked)
      .closest('tr').toggleClass('selected', this.checked);
  });

  $('tbody :checkbox').on('click', function () {
    $(this).closest('tr').toggleClass('selected', this.checked);
    $(this).closest('table').find('#SelectAllCheckbox').prop('checked', ($(this).closest('table').find('tbody :checkbox:checked').length == $(this).closest('table').find('tbody :checkbox').length));  
  });
});




 // Checkbox Select script end



//color Selection  start

$(document).ready(function(){
  $(".colorDiv").click(function(){
    $(".colorDiv").html("");
    $(this).html('<i class="fa fa-check colorDivCheck"></i>');
});
});

//color Selection  end



 // date picker start

 $(function () {
  $('.Settingdatepicker').datetimepicker({
    format: 'L'
  });
});

  // date picker start


//User Management Tab Create a new User start

$("#UserMnageCreateUser").click(function(e){
    e.preventDefault();
    // e.stopPropagation();
    var firstname = $("#UserFirstName").val();
    var lastname = $("#UserLastName").val();
    var emailAddress = $("#UserEmailAdress").val();
    var role = $("#UserRole").val();
    var Profile = $(".ws-user-data").length;
    var newProfileCount = Profile + 1;
    var newid = 'ws-user'+ newProfileCount;

    if(firstname !="" && emailAddress !="" && role !=""){
     var design = '<tr class="table_data ws-user-data">';
     design +='  <td class="name ws-profile-name" id='+ newid +'><img src="/images/users/1joni.jpg" alt="">'+ firstname +' '+lastname+' </td>';
     design +='  <td>'+ firstname +'</td>';
     design +='  <td>'+ role +'</td>';
     design +='  <td>'+ emailAddress +'</td>';
     design +='  <td>03 Dec 2018</td>';
     design +='  <td class="td-status user-profile-status"><span class="Active-users">Active</span><span class="Deactive-users" style="display: none;">Deactive</span><span class="ws-moremenu"><img src="/images/svg/MoreMenu.svg"></span></td>';
     design +='</tr>';
     $("#User-management-User-list").append(design);
     $("#wsCreateBackWrap").hide();
     $('#UserCreateForm').each(function(){
       this.reset();
     });
     $('.ws-profile-name').on('click', function(event){
      $("#UserProfileName").text($(this).closest('tr').find('td:nth-child(1)').text());
      $("#UserProfileEmail").text($(this).closest('tr').find('td:nth-child(4)').text());
      $("#UserProfileUserName").text($(this).closest('tr').find('td:nth-child(2)').text());
      $("#ws-user-management-table").hide();
      $("#ws-user-profile-page").show(); 
    });
     $(".Active-users").click(function(e){
      $(this).hide();
      $(this).parents("td").find(".Deactive-users").show();
    });

    $(".Deactive-users").click(function(e){
      $(this).hide();
      $(this).parents("td").find(".Active-users").show();
    });
   }
});

//User Management Tab Create a new User end

// <!-- user Profile page start -->



// <!-- user Profile page end -->




//User Management Tab profile channels remove start

$(".profile-action-data").click(function(e){
    $(this).parents("tr").remove();
  });

//User Management Tab profile channels remove end





//Workspace management create team start

$("#WsManagCteateTeam").click(function(e){
    e.preventDefault();
    var teamname = $("#WsManagTeamName").val();
    var countTeam = $(".ws_team_name").length;
    var temid = countTeam + 1;
    var teamid = "WsMTeam"+ temid; 
    if(teamname !=""){
      var design = '<div class="teams ws_team_name" id='+ teamid +'><p>'+ teamname +'</p></div>';

      $("#WsNewTeam").append(design);
      $("#Create-TeamBackWrap").hide();
      $('#WsManageNewTeamForm').each(function(){
       this.reset();
      });
      $('.ws_team_name').on('click', function(event){
        $("#ws_all_team").hide();
        $("#ws-team-details").show();
      });
    }
    
});

//Workspace management create team end




//User Management Profile Edit start

$(document).ready(function(){
   $("#UserEditProfileName").click(function(eidt){
    $("#UserProfileName").attr("contenteditable","true");
    $("#UserProfileName").focus();

  });

    $("#UserProfileName").on('keypress',function(e){
      if(e.keyCode == 13){
          $("#UserProfileName").attr("contenteditable", "false")
          $("#UserProfileName").html($("#UserProfileName").text());
        }
    });
});

  $(document).ready(function(){
   $("#UserProfile-Edit-Email").click(function(e){
    $("#UserProfileEmail").attr("contenteditable", "true")
    $("#UserProfileEmail").focus();
  });
   $("#UserProfileEmail").on('keypress',function(e){
      if(e.keyCode == 13){
          $("#UserProfileEmail").attr("contenteditable", "false")
          $("#UserProfileEmail").html($("#UserProfileEmail").text());
        }
    });

   $("#UserProfile-Edit-UserName").click(function(e){
    $("#UserProfileUserName").attr("contenteditable", "true");
    $("#UserProfileUserName").focus();
  });
   $("#UserProfileUserName").on('keypress',function(e){
      if(e.keyCode == 13){
          $("#UserProfileUserName").attr("contenteditable", "false")
          $("#UserProfileUserName").html($("#UserProfileUserName").text());
        }
    });
   $("#UserProfile-Edit-JobTitle").click(function(e){
    $("#UserProfileJobTitle").attr("contenteditable", "true");
    $("#UserProfileJobTitle").focus();
  });
   $("#UserProfileJobTitle").on('keypress',function(e){
      if(e.keyCode == 13){
          $("#UserProfileJobTitle").attr("contenteditable", "false")
          $("#UserProfileJobTitle").html($("#UserProfileJobTitle").text());
        }
    });
});

//User Management Profile Edit end





//Graph Canvas js start

window.onload = function () {
  CanvasJS.addColorSet("greenShades",
           [ "#8366DD", "#66C0DD", "#66DD83", "#DD8366" ]);
  var chart = new CanvasJS.Chart("chartContainer",
  {
    backgroundColor: "#f7f9f9",
    colorSet: "greenShades",
    title:{
      text: ""
    },
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      fontSize: "14",
      fontWeight: "600",
      LineHeight: "20"
    },
    width:275,
    height: 150,
    data: [
    {
     showInLegend: true,
     type: "doughnut",
     startAngle: 270,
     dataPoints: [
     {  y: 35, name: "Design Files", legendText: "Design Files (35%)" },
     {  y: 30, name: "Images", legendText: "Images (30%)" },
     {  y: 25, name: "Videos", legendText: "Videos (25%)" },
     {  y: 10, name: "Documents", legendText: "Documents (10%)" }
     ]
   }
   ]
 });

  chart.render();
}


//Graph Canvas js end

//esc button to close
window.addEventListener("keyup", function(event) {
    // event.preventDefault();
    if (event.keyCode === 27) {

      if($("#wsCreateBackWrap").is(':visible')){
        $('#wsCreateBackWrap').hide();
      }

      if($("#AddUserBackWrap").is(':visible')){
        $('#AddUserBackWrap').hide();

      }

      if($("#Create-TeamBackWrap").is(':visible')){
        $('#Create-TeamBackWrap').hide();
      }

      if($("#DeleteTeamBackWrap").is(':visible')){
        $("#DeleteTeamBackWrap").hide();
      }

      if($("#ChoiceColorBackWrap").is(':visible')){
        $("#ChoiceColorBackWrap").hide();
      }

      if($("#Team-All-Permission").is(':visible')){
         $("#Team-All-Permission").hide();
       }

       if($("#ws-user-profile-page").is(':visible')){
         $("#back-to-user-management").trigger('click');
       }
       if($("#wsTeamTab").is(':visible')){
         $("#ws-team-details-to-back-team").trigger('click');
       }
       if($("#ws-channels-details").is(':visible')){
         $("#ws-channels-details-to-back-channels").trigger('click');
       }

       if($("#Create-userProfile-TeamBackWrap").is(':visible')){
         $("#Create-userProfile-TeamBackWrap-close").trigger('click');
       }
    }
});

// User table profile active deactive start

$(".Active-users").click(function(e){
  $(this).hide();
  $(this).parents("td").find(".Deactive-users").show();
});

$(".Deactive-users").click(function(e){
  $(this).hide();
  $(this).parents("td").find(".Active-users").show();
});

// User table profile active deactive end




// User profile page team tab create team popup start

$("#User-profile-Add-Team").click(function(e){
  $("#Create-userProfile-TeamBackWrap").show();
});

$("#Create-userProfile-TeamBackWrap-close").click(function(e){
  $("#Create-userProfile-TeamBackWrap").hide();
});

// User profile page team tab create team popup end


// User profile page team tab new team add start
$("#User-profile-create-Team-btn").click(function(e){
    e.preventDefault();
    var teamname = $("#Profile-team-Name").val();
    if(teamname !=""){
      var design = '<div class="teams"><p>'+ teamname +'</p></div>';
      $("#Profile-Team-list").append(design);
      $("#Create-userProfile-TeamBackWrap").hide();
      $('#Profile-Team-Form').each(function(){
       this.reset();
      });
    }
});

// User profile page team tab new team add end



// Workspace management team name edit start

$(".edit-ws-team-name").click(function(e){
  $(".wsM-Team-name").attr("contenteditable", "true");
  $(".wsM-Team-name").focus();
});
 $(".wsM-Team-name").on('keypress',function(e){
    if(e.keyCode == 13){
        $(".wsM-Team-name").attr("contenteditable", "false")
        $(".wsM-Team-name").html($(".wsM-Team-name").text());
      }
  });

// Workspace management team name edit end


// Workspace management channel name edit start

$(".edit-ws-channel-name").click(function(e){
  $(".wsM-channel-name").attr("contenteditable", "true");
  $(".wsM-channel-name").focus();
});
 $(".wsM-channel-name").on('keypress',function(e){
    if(e.keyCode == 13){
        $(".wsM-channel-name").attr("contenteditable", "false")
        $(".wsM-channel-name").html($(".wsM-channel-name").text());
      }
  });

 // Workspace management channel name edit end


 // User profile active deactive start

$("#User-Profile-Active").click(function(e){
  $(this).hide();
  $(this).parents("div").find("#User-Profile-Deactive").show();
  $(this).parents("div").find("#User-Profile-Active-Deactive").text("Active");

});

$("#User-Profile-Deactive").click(function(e){
  $(this).hide();
  $(this).parents("div").find("#User-Profile-Active").show();
  $(this).parents("div").find("#User-Profile-Active-Deactive").text("Deactive");
});

// User profile active deactive end



  $(".Home-tab-Toggle").click(function(){
    $("#ws-user-profile-page").hide();
    $("#ws-team-details").hide();
    $("#ws-channels-details").hide();
  });
  
  function wsUserManagementTab() {
   document.getElementById('ws-user-management-table').style.display = "block";
  }


  $(".navigate-tabcustom").click(function(){
    $("#ws-team-details").hide();
    $("#ws-channels-details").hide();
    $("#ws-channels-details").hide();
  });
  
 function wsManagementTab(){
  document.getElementById('ws_all_team').style.display = "block";
  }

  function wsTeamTab() {
   document.getElementById('ws_all_team').style.display = "block";
  }

  function wsChannelTab(){
    document.getElementById('ws-all-channel').style.display = "block";
  }