$(function(){
  $.ajax({
    url:"header.html",
    type:"get",
    success:function(html){
      //console.log(html);
      $(html).replaceAll("#header");
      $(`<link rel="stylesheet" href="css/header.css"/>`).appendTo("head");
      $(`<link rel="stylesheet" href="css/common.css"/>`).appendTo("head");
    }
  })
})