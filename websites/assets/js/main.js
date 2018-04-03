(function ($) {
	"use strict";

	// ==================== Video Play button ===================
	$(".video-play-btn").magnificPopup({type:'video'});

	// ===================== Offcanvas Menu =======================
	$(".offcanvas-menu-trigger").on("click", function(){
		$(".offcanvas-menu, .offcanvas-body-overlay").addClass("active");
	});
	$(".offcanvasmenu-close, .offcanvas-body-overlay").on("click", function(){
		$(".offcanvas-menu, .offcanvas-body-overlay").removeClass("active");
        $(".offcanvas-menu ul li").removeClass('active-dropdown');
	});
	$(".offcanvas-menu ul li a").on("click", function(){
		$(this).parent().toggleClass('active-dropdown');
        $(this).closest('li').siblings('.offcanvas-dropdown').removeClass('active-dropdown');
	});
	
	// ===================== BLOG =======================
	var comenttrigger = $( '.comment-title' );
	var commentarrow = $( '.comment-title i' );
	var comment = $( '.comments-list' );
	var postcomment = $( '.post-my-comment' );
	$( comenttrigger ).on( 'click', function(){
		$( this ).toggleClass( 'comment-title-bg' );
		$( comment ).slideToggle();
		$( postcomment ).slideToggle();
		$(commentarrow).toggleClass('icofont icofont-caret-right icofont icofont-caret-down');
	});
	if(window.location.href.indexOf("#comments") > -1) {
		$( comenttrigger ).toggleClass( 'comment-title-bg' );
		$( commentarrow ).toggleClass( 'icofont icofont-caret-right icofont icofont-caret-down' );
		$( comment ).slideToggle();
		$( postcomment ).slideToggle();
	}
	
	// ===================== select dropdown menu =======================
	$('.product-price1 button').on('click', function () {
		if ($(".duration-time1").hasClass("fadeout"))
			$(".duration-time1").removeClass("fadeout").addClass("fadein");
		else
        $(".duration-time1").removeClass("fadein").addClass("fadeout");
		return false;
	});
	$('.duration-month1').on('click', function () {
		$(".duration-time1").removeClass("fadein").addClass("fadeout");
		$('.product-price1 button').text('month');
		$('.changes-value1').text('35');
		return false;
	});
	$('.duration-week1').on('click', function () {
		$(".duration-time1").removeClass("fadein").addClass("fadeout");
		$('.product-price1 button').text('week');
		$('.changes-value1').text('15');
		return false;
	});
	$('.duration-year1').on('click', function () {
		$(".duration-time1").removeClass("fadein").addClass("fadeout");
		$('.product-price1 button').text('year');
		$('.changes-value1').text('80');
		return false;
	});
	$('.product-price2 button').on('click', function () {
		if ($(".duration-time2").hasClass("fadeout"))
			$(".duration-time2").removeClass("fadeout").addClass("fadein");
		else
        $(".duration-time2").removeClass("fadein").addClass("fadeout");
		return false;
	});
	$('.duration-month2').on('click', function () {
		$(".duration-time2").removeClass("fadein").addClass("fadeout");
		$('.product-price2 button').text('month');
		$('.changes-value2').text('05');
		return false;
	});
	$('.duration-week2').on('click', function () {
		$(".duration-time2").removeClass("fadein").addClass("fadeout");
		$('.product-price2 button').text('week');
		$('.changes-value2').text('02');
		return false;
	});
	$('.duration-year2').on('click', function () {
		$(".duration-time2").removeClass("fadein").addClass("fadeout");
		$('.product-price2 button').text('year');
		$('.changes-value2').text('20');
		return false;
	});
	$('.product-price3 button').on('click', function () {
		if ($(".duration-time3").hasClass("fadeout"))
			$(".duration-time3").removeClass("fadeout").addClass("fadein");
		else
        $(".duration-time3").removeClass("fadein").addClass("fadeout");
		return false;
	});
	$('.duration-month3').on('click', function () {
        $(".duration-time3").removeClass("fadein").addClass("fadeout");
		$('.product-price3 button').text('month');
		$('.changes-value3').text('15');
		return false;
	});
	$('.duration-week3').on('click', function () {
        $(".duration-time3").removeClass("fadein").addClass("fadeout");
		$('.product-price3 button').text('week');
		$('.changes-value3').text('05');
		return false;
	});
	$('.duration-year3').on('click', function () {
        $(".duration-time3").removeClass("fadein").addClass("fadeout");
		$('.product-price3 button').text('year');
		$('.changes-value3').text('50');
		return false;
	});
	
	// ====================== Testmoanial Carousel Active ===================
	$(".testmoanial-active").owlCarousel({
		items:1,
		loop:true,
		dots:false,
		nav:true,
		navText:["<i class='icofont icofont-simple-left'></i>","<i class='icofont icofont-simple-right'></i>"]
	});

	// ====================== Sponcer Carousel Active ===================
	$(".sponcer-testmonial").owlCarousel({
		loop:true,
		dots:false,
		margin:30,
		nav:true,
		navText:["<i class='icofont icofont-long-arrow-left'></i>","<i class='icofont icofont-long-arrow-right'></i>"],
		responsive : {
            0 : {
                items:1,
                margin:0
            },
            480 :{
            	items:2
            },
            768 : {
                items:3            
              },
            992 : {
                items:4
            }
        }
	});
	
	// ====================== Hero Slider Active ===================
	$(".hero-slide-wrapper").owlCarousel({
		items:1,
		loop:true,
		dots:true,
		nav:false
	});

	// ====================== Our Team Active ===================
	$(".our-team-testmmonial").owlCarousel({
		loop:true,
		dots:false,
		margin:30,
		nav:true,
		navText:["<i class='icofont icofont-simple-left'></i>","<i class='icofont icofont-simple-right'></i>"],
		responsive : {
        0 : {
            items:1
        },
        768 : {
            items:2            
          },
        992 : {
            items:3
        	}
    	}
	});

	// ====================== Product Carousel Active ===================
	$(".product-carouel-active").owlCarousel({
		loop:true,
		dots:false,
		margin:30,
		nav:true,
		navText:["<i class='icofont icofont-long-arrow-left'></i>","<i class='icofont icofont-long-arrow-right'></i>"],
		responsive : {
        0 : {
            items:1
        },
        768 : {
            items:2            
          },
        992 : {
            items:3
        	}
    	}
	});

	// ====================== Single Product Carousel Active ===================
	$(".single-product-carousel").owlCarousel({
		items:1,
		loop:true,
		dots:true,
		nav:true,
		navText:["<i class='icofont icofont-simple-left'></i>","<i class='icofont icofont-simple-right'></i>"]
	});

	// ====================== Responsive Active ===================
	$("ul#responsive-menu").slicknav({
		'prependTo': '.responsive-menu'
	});
	$(".sidebar-widget .widget-dropdown a").on("click", function(){
		$(".sidebar-widget .widget-dropdown ul").toggle("fast");
		return false;
	});
	
	new WOW().init();
	
	// ====================== Google Map Active ===================
	if ($.fn.gmap3) {
		var center = [37.772323, -122.214897];
	    $('.google-map')
	      .gmap3({
	        center: center,
	        zoom: 13,
	        scrollwheel: false,
	      })
	      .marker({
	        position: center,
	        icon: 'assets/img/map-marker.png'
	      });
	}

}(jQuery));