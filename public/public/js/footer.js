$(function(){
  $.ajax({
    url:"footer.html",
    type:"get",
    success:function(html){
      //console.log(html);
      $(html).replaceAll("#footer");
      $(`<link rel="stylesheet" href="css/footer.css"/>`).appendTo("head");
      $(`<link rel="stylesheet" href="css/common.css"/>`).appendTo("head");
    }
  })
})