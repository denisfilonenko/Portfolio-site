$(document).ready(function() {

	let x = parseInt( $("#agent").css("left") );

	let heroMove = parseInt($("#agent").attr("data-speed"));

	let heroBg = 0;

	let heroStep = parseInt($("#agent").attr("data-step"));

	let canX1 = parseInt($(".first").css("left"));
	let canX2 = parseInt($(".second").css("left"));
	let canX3 = parseInt($(".third").css("left"));

	let jumpWork = false;

	let lepCounter = 0;

	$("#agent").attr("data-domove", moveHero($("#agent")));

	$("#agent").attr("data-domove");

	$('html').keydown(function(event) {
		switch (event.keyCode) { 
			case 39:
			$("#agent").attr("data-domove", moveHero($("#agent")));
			break;
			
			case 32:
			jumpWork = true;
			jumpHero($("#agent"));
			break;
		} 
	})

	function moveHero (obj) {

		x += heroMove;

		heroBg += heroStep;

		$(obj).css("left", x + "px");

		if (heroBg > 700) { heroBg = 0; }

		$(obj).css("background-position", -heroBg + "px 0px");


		if(x < 0 || x > window.innerWidth - 100) {
			heroMove = -heroMove;			
			$(obj).css("transform", "scaleX(-1)");
			lepCounter++;
		}

		if (x > window.innerWidth - 100) {
			$(obj).css("transform", "scaleX(-1)"); 
		} else if (x < 0) {
			$(obj).css("transform", "scaleX(1)");
		}

		setTimeout(moveHero, 60, obj);

		if (x >= canX1 - 70 && x <= canX1 + 10 || x >= canX2 - 70 && x <= canX2 + 10 || x >= canX3 - 70 && x <= canX3 + 10) {
			if(jumpWork === false){
				heroMove = 0;
				heroStep = 0;
				$(".endGame").css("display", "flex");
			}
		}

		$(".counter").text(lepCounter);
	}

	function jumpHero (obj) {
		let heroTop = parseInt($(obj).css("top"));
		$(obj).queue(function () {
			jumpWork = true;
			$(obj).dequeue();
		});
		$(obj).animate({
			top: heroTop - 150 + "px"
		}, 350)
		$(obj).animate({
			top: "81vh"
		}, 350)
		$(obj).queue(function () {
			jumpWork = false;
			$(obj).dequeue();
		});
	}
})
