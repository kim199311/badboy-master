$(function(){
  $.ajax({
    url:"index.html",
    type:"get",
    success:function(html){
      //console.log(html);
      $(`<link rel="stylesheet" href="css/index.css"/>`).appendTo("head");
    }
  })
})
// $(".parent").hover(function(){
//   $(this).next(".left_hidden").toggleClass("in");
// });
$("#live>.liveList>.liveFloor>ul>li>a:first-child").hover(function(){
  console.log($(this));
   $(this).next().next().toggleClass("in");
});
/*$("#live>.liveList>.liveFloor>ul>li>a").hover(function(){
  console.log($(this));
   $(this).next().next().toggleClass("in");
});*/
//唱片购买按钮显示
/*$("#records>.recordsList>ul>li>a:first-child").hover(function(){
  $(this).next().next().next().toggleClass("in");
});*/
$("#records>.recordsList>ul>li").hover(function(e){
  e.stopPropagation();
  $(e.target).next().next().next().toggleClass("in");
});
$("#lab>.labList>ul>li>a:first-child").hover(function(){
  $(this).next().next().next().toggleClass("in");
})
// 新闻动画
$("#news>.newsList>.newsLeft>a:first-child").hover(function(){
  $(this).next().toggleClass("in");
});

var audios = document.querySelectorAll("#popMusic audio");

// console.log(audios,typeof(audios));

// 但是! 不能直接当数组操作! !!! 原因未明







var divs = document.getElementById("popMusic");
divs.onclick = function(e){
    // console.log(e.target.parentElement.children[1]);
    if(e.target.parentElement.children[1].paused==true){
        for (let i = 0; i < audios.length; i++) {
            // console.log(audios[i]);
            audios[i].play();
        }
        e.target.parentElement.children[1].play();
        e.target.parentElement.children[2].innerHTML="II";
    }else{
        for (let i = 0; i < audios.length; i++) {
            // console.log(audios[i]);
            audios[i].pause();
        }
        e.target.parentElement.children[2].innerHTML="▶"
    }
}