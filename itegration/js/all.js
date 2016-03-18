
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
	var eCar = $('.eventCarousel');
    eCar.owlCarousel({
	    loop:false,
	    center:true,
	    margin:15,
	    nav:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        650:{
	            items:2
	        },
	        1050:{
	            items:3
	        },
	        1400:{
	            items:4
	        }
	    }
	});
	eCar.on('mousewheel', '.owl-stage', function (e) {
	    if (e.deltaY<=0) {
	        eCar.trigger('next.owl');
	    } else {
	        eCar.trigger('prev.owl');
	    }
	    e.preventDefault();
	});

	window.addEventListener("scroll", function() {
	    if (window.scrollY > 20) {
	        $('.navbar').addClass('bg');
	    }
	    else {
	        $('.navbar').removeClass('bg');
	    }
	},false);

});