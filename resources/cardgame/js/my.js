let arrCards = new Array();
arrCards[0] = new Array();
arrCards[1] = new Array();

arrCards[0][0] = "card1";
arrCards[0][1] = "card2";
arrCards[0][2] = "card1";
arrCards[0][3] = "card2";

arrCards[1][0] = "card3";
arrCards[1][1] = "card4";
arrCards[1][2] = "card4";
arrCards[1][3] = "card3";

let cardsOpen = 0;
let checkedArray = [];  // массив выбранных карт

let firstOpen = 0;

function toggleCard(r, c) {
	$("#card" + r + c).animate ({
		width: "0%"
	})

	$("#card" + r + c).queue(function () {

		cardsOpen++;
		let cardId = "#card" + r + c;

		$(cardId).toggleClass("close");
		$(cardId).toggleClass(arrCards[r][c]);
		if(cardsOpen == 2) {
			if(firstOpen == arrCards[r][c]){
				$("#gamePad div div div." + firstOpen).stop().animate({
					opacity: 0,
				}, 1500);
				cardsOpen = 0;
				firstOpen = 0;
			}	else {
				setTimeout(hideCards, 600);
				cardsOpen = 0;
				firstOpen = 0;
			}
		} 
		firstOpen = arrCards[r][c];
		$("#card" + r +c).dequeue();
	});
	$("#card" + r + c).animate({
		width: "100%"
	});
}

function showCards() {
	for(let r = 0; r < 2; r++){
		for(let c = 0; c < 4; c++){
			$("#card" + r + c).animate ({
				width: "0%"
			}
			);

			$("#card" + r + c).queue(function () {
				$("#card" + r +c).removeClass();
				$("#card" + r +c).addClass(arrCards[r][c]);
				$("#card" + r +c).dequeue();
			});
			$("#card" + r + c).animate({
				width: "100%"
			}
			);
		}
	}
}

function hideCards() {

	for(let r = 0; r < 2; r++){
		for(let c = 0; c < 4; c++){

			$("#card" + r + c).animate ({
				width: "0%"
			}
			);

			$("#card" + r + c).queue(function () { 
				$("#card" + r + c).removeClass();    
				$("#card" + r + c).addClass("close");  
				$("#card" + r + c).dequeue();      	
			});

			$("#card" + r + c).animate({
				width: "100%"
			});
		}
	}

	cardsOpen = 0;
	firstOpen = 0;
}
