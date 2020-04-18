

	let xUnshootableField = 150;//непростреливаемое поле слева и справа
	let yUnshootableField = 80; //непростреливаемое поле сверху и снизу

	//координаты игрового поля
	let xStartPG = xUnshootableField;
	let xEndPG = window.innerWidth - xUnshootableField;
	let yStartPG = yUnshootableField;
	let yEndPG = window.innerHeight - yUnshootableField;

	function gamePadSetup () {

	}
	

	let num = 1, x, y;

	let shootedBirds = 0;

//Обернем наш код в событие load
$(document).ready(function() {

	$(window).resize(gamePadSetup); // Пересчитать игровое поле, в случае, если пользователь изменил размеры браузера

//*------ Работа с прицелом
	let sizeTarget = $('#target').width();//размер прицела
	let xTarget = xStartPG;//координаты
	let yTarget = yEndPG;//		прицела


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

		$('#target').css('left', xTarget - sizeTarget/2 + 'px')
		.css('top', yTarget - sizeTarget/2 + 'px');
	}


	$('body').mousemove(function (event) {
		moveTarget(event);
	})


	//*---- Перемещение птиц
	let xBirdsMoveArr = [3, 3, 3, 3];
	let yBirdsMoveArr = [3, 3, 3, 3];
	let turnAmount = [0, 0, 0, 0];

	function moveBirds () {

		for (let i = 1; i <= num; i++) {
			let bird = $("#bird" + i);

			x = parseInt( $(bird).css("left") );
			y = parseInt( $(bird).css("top") );

			x+= xBirdsMoveArr[i-1]; y+= yBirdsMoveArr[i-1]; 

			$(bird).animate({left : x + "px", top : y + "px"}, 0);

			let chanceToReturn = 0.0025;

			if(x < 0 || x > window.innerWidth || x === parseInt(Math.random() * window.innerWidth)) {
				xBirdsMoveArr[i-1] = -xBirdsMoveArr[i-1];
				$(bird).css("transform", "scaleX(-1)");
				turnAmount[i-1]++;
				if (turnAmount[i-1] === 2) {
					$(bird).css("transform", "scaleX(1)");
					turnAmount[i-1] = 0;
				}
			}

			if (x > window.innerWidth) {
				$(bird).css("transform", "scaleX(-1)"); 
			} else if (x < 0) {
				$(bird).css("transform", "scaleX(1)");
			}

			if(y < 0 || y > window.innerHeight || y === parseInt(Math.random() * window.innerHeight)) {
				yBirdsMoveArr[i-1] = -yBirdsMoveArr[i-1];
			}	
		}


	}


	let ptrMoveBirds = setInterval(moveBirds, 5);

	$('body').click(function(event) {
		let xB, yB, wB, hB;
		let xS = event.pageX;
		let yS = event.pageY;


		for (let n = 0; n <= num; n++) {
			xB = parseInt( $("#bird" + n).css("left") );
			yB = parseInt( $("#bird" + n).css("top") );

			wB = parseInt( $("#bird" + n).width());
			hB = parseInt( $("#bird" + n).height());

			if (xB < xS && xS < xB + wB && yB < yS && yS < yB + hB) {
				$('#target').css('background-image', 'url(img/target.png');
				$("#bird" + n).css('transform', 'rotate(90deg)');
				$("#bird" + n).animate({
					top: "100%"
				}, 500, "linear");
				$("#bird" + n).animate({
					opacity: 0
				}, 100);
				shootedBirds++;
				$(".add").trigger('click');
			} 

			$("body").mousemove(function() {
				$('#target').css('background-image', 'url(img/target_00.png');
			})

		}

		if (shootedBirds === 4) {
			$("body").append('<div id="win">YOU WON!</div>');
		}

		$(".reset").click(function (){
			location.reload();
		});

	})

	function getXpositionOfBird() {
		let x_position = Math.floor(Math.random() * window.innerWidth);
		return x_position;
	}

	$(".add").click(function (){
		num++;
		setTimeout (function() {
			$("body").append('<div id="bird' + num + '" class="bird added"></div>');
			$(".added").css("left", getXpositionOfBird());
		}, 300);
	});

	
	$('html').keydown(function(e) {
		if(e.keyCode == 70) {
			$(".add").trigger('click');
		} else if (e.keyCode == 82) {
			$(".reset").trigger('click');
		}
	})
});


