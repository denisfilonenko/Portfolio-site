$(window).scroll( function () {

	let scroll = $(document).scrollTop();	

	let scrollCoef = 0.0035;

	$("#slide1").css({
		"transform" : "translate(0%, " + scroll/18.5 + "%"
	});

	$("#slide1 .history").css({
		"transform" : "translate(0%, " + scroll/1.5 + "%",
		"opacity" : 1 - scroll * scrollCoef
	});

	if($(window).scrollTop() >= 0 && $(window).scrollTop() <= $("#slide2").scrollTop() + $("#slide2").height()/1.3) {
		$(".navigation li").removeClass('active');
		$(".gen1").addClass('active');
	} 


	if($(window).scrollTop() >= $("#slide2").scrollTop() + $("#slide2").height()) {
		scroll = $(document).scrollTop() - ($("#slide2").scrollTop() + $("#slide2").height());
		$("#slide2").css({
			"transform" : "translate(0%, " + scroll/20 + "%"
		});

		$("#slide2 .history").css({
			"transform" : "translate(0%, -" + scroll/1.5 + "%",
			"opacity" : 1 - scroll * scrollCoef
		});
	} 

	if($(window).scrollTop() >= $("#slide2").scrollTop() + $("#slide2").height()/1.3 && $(window).scrollTop() <= $("#slide2").scrollTop() + $("#slide2").height()*1.6) {
		$(".navigation li").css({
			'color' : '#fff',
			'border-color' : '#fff',
		});
		$(".navigation li").removeClass('active');
		$(".gen2").addClass('active');
	} else {
		$(".navigation li").css({
			'color' : '#000',
			'border-color' : '#000'
		});
	}

	if($(window).scrollTop() >= $("#slide3").scrollTop() + $("#slide3").height() * 2) {
		scroll = $(document).scrollTop() - ($("#slide3").scrollTop() + $("#slide3").height() * 2);
		$("#slide3").css({
			"transform" : "translate(0%, " + scroll/20 + "%"
		});

		$("#slide3 .history").css({
			"transform" : "translate(0%, " + scroll/2 + "%",
			"opacity" : 1 - scroll * scrollCoef
		});
	}

	if($(window).scrollTop() >= $("#slide3").scrollTop() + $("#slide3").height()*2/1.3 && $(window).scrollTop() <= $("#slide3").scrollTop() + $("#slide3").height()*2*2) {
		$(".navigation li").removeClass('active');
		$(".gen3").addClass('active');
	} 

	if($(window).scrollTop() >= $("#slide4").scrollTop() + $("#slide4").height() * 3) {
		scroll = $(document).scrollTop() - ($("#slide4").scrollTop() + $("#slide4").height() * 3);
		$("#slide4").css({
			"transform" : "translate(0%, " + scroll/24 + "%"
		});

		$("#slide4 .history").css({
			"transform" : "translate(0%, " + scroll/2 + "%",
			"opacity" : 1 - scroll * scrollCoef
		});
	}

	if($(window).scrollTop() >= $("#slide4").scrollTop() + $("#slide4").height()*3/1.1 && $(window).scrollTop() <= $("#slide4").scrollTop() + $("#slide4").height()*3*1.5) {
		$(".navigation li").removeClass('active');
		$(".gen4").addClass('active');
	} 

	if($(window).scrollTop() >= $("#slide5").scrollTop() + $("#slide5").height() * 4) {
		scroll = $(document).scrollTop() - ($("#slide5").scrollTop() + $("#slide5").height() * 4);
		$("#slide5").css({
			"transform" : "translate(0%, " + scroll/20 + "%"
		});

		$("#slide5 .history").css({
			"transform" : "translate(0%, -" + scroll/1.5 + "%",
			"opacity" : 1 - scroll * scrollCoef
		});

		$("#slide6").css({
			"background-attachment" : "fixed"
		});

		$("#slide6 .history").css({
			"opacity" : 0 + scroll/5 * scrollCoef
		});
	} 	

	if($(window).scrollTop() >= $("#slide5").scrollTop() + $("#slide5").height()*4/1.1 && $(window).scrollTop() <= $("#slide5").scrollTop() + $("#slide5").height()*4*1.5) {
		$(".navigation li").removeClass('active');
		$(".gen5").addClass('active');
	} 

	if($(window).scrollTop() >= $("#slide5").scrollTop() + $("#slide5").height()*4*1.15) {
		$(".navigation li").removeClass('active');
		$(".gen6").addClass('active');
	} 
});



function checkSlide(el) {
	let slideHeight = $('.slide').height();
	let index = $(el).attr('class').substring(3, 4);
	$('body, html').stop().animate({
		scrollTop: slideHeight * (index - 1),
	}, 1200, 'linear');

}
