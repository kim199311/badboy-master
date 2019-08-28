jQuery(document).ready(function ($) {
		
		$('.llOne').mouseover(function(){
			$(this).find('.llOneCon').show();
		});
		$('.llOne').mouseleave(function(){
			$('.llOneCon').fadeOut("fast");
		});
		
		
		$('.llOneR').mouseover(function(){
			$(this).find('.llOneCon').show();
		});
		$('.llOneR').mouseleave(function(){
			$('.llOneCon').fadeOut("fast");
		});
		
		$('.htCon').mouseover(function(){
			$(this).find('.htConT').fadeIn("fast");
		});
		$('.htCon').mouseleave(function(){
			$('.htConT').fadeOut("fast");
		});
		
		$('.loBox').mouseover(function(){
			$(this).find('.loCon').hide();
		});
		$('.loBox').mouseleave(function(){
			$('.loCon').show();
		});
		
		$('#showArea img').mouseover(function(){
			$('#showArea img').removeClass('imgLive');
			$(this).addClass('imgLive');
		});

    });   
	
	
	/* 列表切换 */
	function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
	var menu=document.getElementById(name+i);
	var con=document.getElementById("con_"+name+"_"+i);
	menu.className=i==cursel?"artLive":"";
	con.style.display=i==cursel?"block":"none";
	}
	}
	
	/*返回顶部*/
	$(function(){	
		$(window).scroll(function() {		
			if($(window).scrollTop() >= 300){
				$('#actGotop').fadeIn(300); 
			}else{    
				$('#actGotop').fadeOut(300);    
			}  
		});
		$('#return').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 400);});	
	});