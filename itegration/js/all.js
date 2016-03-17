
/**========================================
				Main.js
==========================================*/

/*global $*/

$(function () {
	'use strict';
	var vid = $('#baseVid')[0];
	setTimeout(function(){
		vid.currentTime = 7;
    	vid.play();
   	}, 5000);
	setInterval(function(){
		if(vid.currentTime>280) {
			vid.currentTime = 7;
		}
	},500);
	var i=2;
	var slogan = setInterval(function(){
		$('#slogan'+i).addClass('slogan-animation');
		i++;
		if(i>4) {
			clearInterval(slogan);
		}
	},5000);

	$('.carousel').carousel({
        interval: 5000
    });
});