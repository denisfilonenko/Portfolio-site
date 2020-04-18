var linkNav = document.querySelectorAll('[href^="#"]'), 
V = 0.3;  
for (var i = 0; i < linkNav.length; i++) {
	linkNav[i].addEventListener('click', function(e) { 
		e.preventDefault(); 
		var w = window.pageYOffset,  
		hash = this.href.replace(/[^#]*(.*)/, '$1');  
		t = document.querySelector(hash).getBoundingClientRect().top,  
		start = null;
		requestAnimationFrame(step); 
		function step(time) {
			if (start === null) start = time;
			var progress = time - start,
			r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
			window.scrollTo(0,r);
			if (r != w + t) {
				requestAnimationFrame(step)
			} else {
				location.hash = hash 
			}
		}
	}, false);
}


function changeMenuBox() {
	let checkedMenu = document.getElementById('menu__toggle');
	if (checkedMenu.checked = true) {
		checkedMenu.checked = false;
	}
}

let focusedHeader = document.querySelector('.header__wrapper')
let focusedSection = document.querySelectorAll('section');
let checkedMenu = document.getElementById('menu__toggle');

for (let i = 0; i < focusedSection.length; i++) {
	focusedSection[i].addEventListener("click", function() {
		checkedMenu.checked = false;
	});
}


//Slider

let slides = document.querySelectorAll('#slides .slide');
let currentSlide = 0;

function nextSlide(){
	goToSlide(currentSlide+1);
}

function previousSlide(){
	goToSlide(currentSlide-1);
}

function goToSlide(n){
	slides[currentSlide].className = 'slide';
	currentSlide = (n+slides.length)%slides.length;
	slides[currentSlide].className = 'slide showing';
}

let next = document.getElementById('next');
let previous = document.getElementById('previous');

next.onclick = function() {
	nextSlide();
};
previous.onclick = function() {
	previousSlide();
};