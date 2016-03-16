
/**========================================
				Main.js
==========================================*/

/*global $*/

$(function () {
	'use strict';
	
	setTimeout(function(){
		var vid = $('#baseVid')[0];
		vid.currentTime = 7;
    	vid.play();
    	$('.videoWrap').css('background','black');
	}, 5000);

	var i=2;
	var slogan = setInterval(function(){
		$('#slogan'+i).addClass('slogan-animation');
		i++;
		if(i>4) {
			clearInterval(slogan);
		}
	},5000);

	$('.carousel').carousel({
        interval: 5000 //changes the speed
    });
});