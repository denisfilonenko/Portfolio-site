

let xUnshootableField = 150;
let yUnshootableField = 80; 

let xStartPG = xUnshootableField;
let xEndPG = window.innerWidth - xUnshootableField;
let yStartPG = yUnshootableField;
let yEndPG = window.innerHeight - yUnshootableField;

function gamePadSetup () {

}

let num = 1, x, y;

let chanceToStop = 0.004;



$(document).ready(function() {

	$(window).resize(gamePadSetup); 

	let sizeTarget = $('.target_box').width();
	let xTarget = xStartPG;
	let yTarget = yEndPG;


	function moveTarget(event){
		xTarget = event.pageX;
		yTarget = event.pageY;

		if (xTarget < xStartPG ) {
			xTarget = xStartPG;
		}

		if (xTarget > xEndPG) {
			xTarget = xEndPG;
		}

		if (yTarget < yStartPG ) {
			yTarget = yStartPG;
		}

		if (yTarget > yEndPG) {
			yTarget = yEndPG;
		}

		$('.target_box').css('left', xTarget - sizeTarget/2 + 'px')
		.css('top', yTarget - sizeTarget + 'px');

		$('#target').css('width', "250px")
		.css('height', "500px");

		let x = $('.target_box').css('left');
		targetWidth = $('.target_box').css('width');

		$(".shell").css("left", x - targetWidth);
	}

	let changeAim = function () {
		$('#target').animate({
			width: "100px",
			height: "200px"
		}, 1000)
	}

	let aimTimeOut = setTimeout(changeAim, 400);

	$('body').mousemove(function (event) {
		moveTarget(event);
		clearTimeout(aimTimeOut);

		aimTimeOut = setTimeout(changeAim, 400);
	})



	// Загружаю ее в качестве поля data-*
	$(".tank").attr("data-domove", moveTankNew($(".tank")));

	// Делаю первый вызов полета птицы
	$(".tank").attr("data-domove");

	function moveTankNew (obj) {

		x = parseInt( $(obj).css("left") );
		y = parseInt( $(obj).css("top") );

		let xTankMove = parseInt($(obj).attr("data-speedx"));
		let yTankMove = parseInt($(obj).attr("data-speedy"));


		x+= xTankMove; y += yTankMove;

		$(obj).animate({left: x + "px"}, 0);


		if(Math.random() < chanceToStop) {
			$(obj).attr("data-speedx", 0);
			$(obj).addClass('rotate');
			$(obj).delay(1000).animate({top: "400px"}, 4000);
		}	

		setTimeout(moveTankNew, 10, obj);

	}

	$('body').click(function(event) {
		let xB, yB, wB, hB;
		let xS = event.pageX;
		let yS = event.pageY;

		xB = parseInt( $(".tank").css("left") );
		yB = parseInt( $(".tank").css("top") );

		wB = parseInt( $(".tank").width());
		hB = parseInt( $(".tank").height());

		if (xB < xS && xS < xB + wB && yB < yS && yS < yB + hB) {
			$(".target").css('border-color', 'red');
			$(".target_dot").css('background-color', 'red');
			moveShell($(".tank"));
			doBang($(".tank"));
			setTimeout(explodeTank, 1501);
			setTimeout(doNormalAim, 300);
			setTimeout(stopTank, 1500);
			setTimeout(runInfo, 1500);
		} else {
			$(".target").css('border-color', 'red');
			$(".target_dot").css('background-color', 'red');
			moveShell($(".target_box"));
			doBang($(".target_box"));
			setTimeout(doNormalAim, 300);
		}
	})


	function moveShell (obj) {
		targetWidth = parseInt($(obj).css("width"));
		x = parseInt($(obj).css("left"));
		y = parseInt( $(obj).css("top") );
		console.log(parseInt( $(obj).css("left")));
		$(".shell").css("left", x + (targetWidth)/4);
		$(".shell").delay(1000).animate({opacity: 1, top: y + 50}, 500);
		$(".shell").delay(0).animate({opacity: 0,  top: "100%"}, 0);
	} 

	function doBang (obj) {
		xExp = parseInt( $(obj).css("left") );
		yExp = parseInt( $(obj).css("top") );
		$(".explosion").css("left", xExp)
		.css("top", yExp)
		$(".explosion").delay(1350).animate({opacity: 1}, 1000);	
		$(".explosion").animate({opacity: 0}, 100);	
	}

	function doNormalAim () {
		$(".target").css('border-color', '#124714');
		$(".target_dot").css('background-color', '#124714');
	}

	function explodeTank () {
		$(".tank").css("background-image", "url(img/tankEx.png)").css('background-size', '100%')
		.css('background-position',  '0px 0px');	
	}

	function stopTank () {
		$(".tank").stop();
		$(".tank").attr('data-speedx', 0);
		chanceToStop = 0;
	}

	function runInfo () {
		$(".win").css("opacity", 1);
	}
});


