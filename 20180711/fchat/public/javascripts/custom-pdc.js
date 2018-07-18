$(function () {

  var TaggedArray = getCookie('TaggedArray');
  var res = TaggedArray.split(",");
  if(res.length > 0){
    $.each(res, function(k,v){
      var design = '<span class="tagClassName" id="tagged'+v+'">';
          design +='    <span class="public-relations">'+switchHandle(v)+'</span>';
          design +='    <span><img class="removePublicTag" src="/images/close_20px_700 @1x.png"/></span>';
          design +='  </span>';
      $("#PDCTagHolder").append(design);
    });

    $("#tags-2").text("("+res.length+")");
  }
  console.log(getCookie('tagUserr'));




  $("#hayven-proname-span").text(getCookie('ProjectName'));
  $("#pdc-desc").text(getCookie('Description'));

});

var switchHandle =(expression) =>{
  switch(expression) {
      case 'publicrelations':
          return 'Public Relations';
          break;
      case 'salesnmarketing':
          return 'Sales & Marketing';
          break;
      case 'consulting':
          return 'Consulting';
          break;
      case 'finance':
          return 'Finance';
          break;
      case 'accounting':
          return 'Accounting';
          break;
  }
}
