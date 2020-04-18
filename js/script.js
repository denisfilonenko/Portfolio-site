// #home animation

$('.menu a[data-file="index.html"]').addClass("active");

let check = 0;
let sectionWidth = $("#home").width();
let menuWidth = $(".menu").width();
let startAnimateMenu = function() {
   $(".menu").stop().animate({
    left: 0
}, 500);
   $("#home").css("transform", "perspective(" + sectionWidth + ") rotateY(-25deg) ").css("transition-duration", ".5s");
   $(".menu_btn_center").animate({
    width: "45%",
    top: "13px",
    left: "13px"
}, 0)
   $(".menu_btn_top").animate({
    width: "60%",
}, 0)
   $(".menu_btn_bottom").css("transform", "rotate(90deg)").css("width", "100%").css('bottom', '4px').css('left', '-3px');
}
let endAnimateMenu = function() {
    $(".menu").stop().animate({
        left: -menuWidth + 50 + 'px'
    }, 500);
    $("#home").css("transform", "none").css("transition-duration", ".5s");
    $(".menu_btn_center").animate({
        width: "100%",
        top: "9px",
        left: "0"
    }, 0);
    $(".menu_btn_top").animate({
        width: "100%",
    }, 0);  
    $(".menu_btn_bottom").css("transform", "rotate(0)").css("width", "100%").css('bottom', '0').css('left', '0');
}
$("aside").mouseenter(function () {   
    startAnimateMenu();
})
$("aside").mouseleave(function () {
    endAnimateMenu();
})
let menuCounter = 0;
$(".menu_btn").click(function() {
    menuCounter++;
    if(menuCounter == 1) {
        startAnimateMenu();
    } else if (menuCounter == 2) {
        endAnimateMenu();
        menuCounter = 0;
    }
})


$('body').css('overflow', 'hidden hidden');

    // load pages

    $(".menu a").click( function () {
        if ($(this).data("file") === undefined) return false;
        loadPage($(this).data("file"));
        return false;
    });    

    function loadPage (file) {
        $("#preloader").css('visibility', 'visible');
        $.get(
            "ajax/file.php",
            {
                "file": "pages/" + file
            },
            function (data) {
                $("main").html(data);
                switch (file) {
                    case "index.html": {
                        $(".menu a").removeClass("active");
                        animateHome();
                        $('.menu a[data-file="index.html"]').addClass("active");
                        break;
                    }
                    case "about.html": {
                        $(".menu a").removeClass("active");
                        animateAbout();
                        $('.menu a[data-file="about.html"]').addClass("active");
                        break;
                    }
                    case "portfolio.html": {
                        $(".menu a").removeClass("active");
                        animatePortfolio();
                        $('.menu a[data-file="portfolio.html"]').addClass("active");
                        break;
                    }
                    case "contacts.html": {
                        $(".menu a").removeClass("active");
                        animateContacts();                        
                        $('.menu a[data-file="contacts.html"]').addClass("active");
                    }
                }
                $("#preloader").css('visibility', 'hidden');
            }
            )
        return false;
    }


// Canvas

function animateHome() {
    $("nav").css('cursor', 'default');
    $("nav a").css('cursor', 'pointer');
    $('body').css('overflow', 'hidden hidden');
}

function animateAbout () {

    $(".about_box").animate({
        opacity: 0
    }, 0);

    $(".about_box").animate({
        opacity: 1
    }, 1200);

    let width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
    	width = window.innerWidth;
    	height = window.innerHeight;
    	target = {x: width/2, y: height/2};

    	largeHeader = document.getElementById('about');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(let x = 0; x < width; x = x + width/20) {
        	for(let y = 0; y < height; y = y + height/20) {
        		let px = x + Math.random()*width/20;
        		let py = y + Math.random()*height/20;
        		let p = {x: px, originX: px, y: py, originY: py };
        		points.push(p);
        	}
        }

        // for each point find the 5 closest points
        for(let i = 0; i < points.length; i++) {
        	let closest = [];
        	let p1 = points[i];
        	for(let j = 0; j < points.length; j++) {
        		let p2 = points[j]
        		if(!(p1 == p2)) {
        			let placed = false;
        			for(let k = 0; k < 5; k++) {
        				if(!placed) {
        					if(closest[k] == undefined) {
        						closest[k] = p2;
        						placed = true;
        					}
        				}
        			}

        			for(let k = 0; k < 5; k++) {
        				if(!placed) {
        					if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
        						closest[k] = p2;
        						placed = true;
        					}
        				}
        			}
        		}
        	}
        	p1.closest = closest;
        }

        // assign a circle to each point
        for(let i in points) {
        	let c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
        	points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
    	if(!('ontouchstart' in window)) {
    		window.addEventListener('mousemove', mouseMove);
    	}
    	window.addEventListener('scroll', scrollCheck);
    	window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
    	let posx = posy = 0;
    	if (e.pageX || e.pageY) {
    		posx = e.pageX;
    		posy = e.pageY;
    	}
    	else if (e.clientX || e.clientY)    {
    		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    	}
    	target.x = posx;
    	target.y = posy;
    }

    function scrollCheck() {
    	if(document.body.scrollTop > height) animateHeader = false;
    	else animateHeader = true;
    }

    function resize() {
    	width = window.innerWidth;
    	height = window.innerHeight;
    	largeHeader.style.height = height+'px';
    	canvas.width = width;
    	canvas.height = height;
    }

    // animation
    function initAnimation() {
    	animate();
    	for(let i in points) {
    		shiftPoint(points[i]);
    	}
    }

    function animate() {
    	if(animateHeader) {
    		ctx.clearRect(0,0,width,height);
    		for(let i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                	points[i].active = 0.3;
                	points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                	points[i].active = 0.1;
                	points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                	points[i].active = 0.02;
                	points[i].circle.active = 0.1;
                } else {
                	points[i].active = 0;
                	points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
       TweenLite.to(p, 1+1*Math.random(), {x:p.originX-10+Math.random()*20,
        y: p.originY-10+Math.random()*20, ease:Circ.easeInOut,
        onComplete: function() {
         shiftPoint(p);
     }});
   }

    // Canvas manipulation
    function drawLines(p) {
    	if(!p.active) return;
    	for(let i in p.closest) {
    		ctx.beginPath();
    		ctx.moveTo(p.x, p.y);
    		ctx.lineTo(p.closest[i].x, p.closest[i].y);
    		ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
    		ctx.stroke();
    	}
    }

    function Circle(pos,rad,color) {
    	let _this = this;

        // constructor
        (function() {
        	_this.pos = pos || null;
        	_this.radius = rad || null;
        	_this.color = color || null;
        })();

        this.draw = function() {
        	if(!_this.active) return;
        	ctx.beginPath();
        	ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
        	ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
        	ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
    	return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    // Slider
    $(".slider").slick({
    	infinite: true,
    	fade: true,
    	cssEase: 'linear'
    });

    let curSlide = 1;
    $(".slick-prev, .slick-next").click(function () {
    	curSlide++;
    	$("#about h2").text("About me");
    	if (curSlide == 2) {
    		$("#about h2").text("My skills");
    		curSlide = 0;
    	}
    })


    // Tag cloud
    const myTags = [
    'images/html.png', 'images/CSS3.png', 'images/js.png', 'images/jquery.png', 
    'images/bootstrap4.png', 'images/sass.png', 'images/git.png',
    'images/ajax.png', 'images/json.png', 'images/vue.png',
    ];
    let tagCloud = TagCloud('.tagCloud', myTags, {
    	radius: 300,
    	maxSpeed: 'normal',
    	initSpeed: 'normal',
    	direction: 120,
    	keep: true
    });

    for( let i = 1; i <= myTags.length+1; i++) {
    	$(".tagcloud--item:nth-child(" + i + ")").html("<img src=" + myTags[i-1] + ">");
    }

    $("nav").css('cursor', 'url(images/cursor.png) 15 15, auto');
    $("nav a").css('cursor', 'url(images/cursor.png) 15 15, auto');

    $('body').css('overflow', 'hidden auto');
}





// #portfolio 


function animatePortfolio () {

    $("h3, .sites, .codeExamples").animate({
        opacity: 0
    }, 0);

    $("h3, .sites, .codeExamples").animate({
        opacity: 1
    }, 1200);

    let boxShadow = '<div class="box_shadow"></div>';
    let top_loader = '<div class="top_loader"></div>';
    let right_loader = '<div class="right_loader"></div>';
    let bottom_loader = '<div class="bottom_loader"></div>';
    let left_loader = '<div class="left_loader"></div>';

    function animateProject (obj) {

        let img = $(obj).attr("data-img");
        $(obj).css('background-image', 'url(images/' + img + ')');   

        $(obj).find("a").text("VIEW PROJECT");


        $(obj).mouseenter(function() {
            $(obj).append(boxShadow).append(top_loader).append(right_loader).append(bottom_loader).append(left_loader);

            $(".top_loader").animate({
                width: '100%'
            }, 100)
            $(".right_loader").delay(100).animate({
                height: '100%'
            }, 100)
            $(".bottom_loader").delay(200).animate({
                width: '100%'
            }, 100)
            $(".left_loader").delay(300).animate({
                height: '100%'
            }, 100)
        })
        $(obj).mouseleave(function() {
            $(".top_loader").delay(240).animate({
                width: "0px"
            }, 80)
            $(".right_loader").delay(160).animate({
                height: "0px"
            }, 80)
            $(".bottom_loader").delay(80).animate({
                width: "0px"
            }, 80)
            $(".left_loader").animate({
                height: "0px"
            }, 80)
            $(obj).children(".box_shadow, .top_loader, .right_loader, .bottom_loader, .left_loader").delay(320).hide(0, function() {
                $(this).remove();
            });  
        })
    }

    $("#portfolio > div > div").show(0, function() {
        animateProject(this);
    })


    // Подгрузка работ
    let projectCount = 4;
    $("#btnLoadMoreProjects").click( function () {
        for(let z = 0; z < 3; z++) {
            $.get(
                "ajax/project.php",
                {
                    "projectCount": projectCount
                },
                addProjectToList
                );
            projectCount++;
        }
        let scrollBottom = $(window).scrollTop() + $(window).height();
        $("html, body").animate({ scrollTop: scrollBottom }, 1000);

    })

    function addProjectToList(data) {
        let text = $(data).text();
        let warning = new RegExp("Warning:");
        if (warning.test(text)){
            return;
        } else {
            $(".codeExamples").append(data);
            $("#btnLoadMoreProjects ~ div").show(0, function() {
                animateProject(this);
                $(this).animate({
                    opacity: 0
                }, 0);

                $(this).animate({
                    opacity: 1
                }, 1200);
            });
        }
    }
    $("nav").css('cursor', 'default');
    $("nav a").css('cursor', 'pointer');

    $('body').css('overflow', 'hidden auto');
}




// contacts

function animateContacts() {
    $("form, p").animate({
        opacity: 0
    }, 0);

    $("form, p").animate({
        opacity: 1
    }, 1200);


    $('body').css('overflow', 'hidden auto');

    $('body').on('submit', '#my_form', function(){
        validateForm();
        return false;
    });

    $("nav").css('cursor', 'default');
    $("nav a").css('cursor', 'pointer');
}





function sendForm () {
    $.post(
        'ajax/mail.php',
        {
            "name" : $("#name").val(),
            "phone" : $("#phone").val(),
            "email" : $("#email").val(),
            "message" : $("#message").val()
        },
        checkAnswer
        )
}

function checkAnswer(data) {
    console.log(data);
    let res = JSON.parse(data);
    if(res.name === undefined) {
        alert("Type your name!");
    } else {
        $(".thank_box_text").text(res.msg + res.name + '!');
        $(".thank_box").css('opacity', 1).css('z-index', 3);
        $('.okButton').on('click', function(){
            $(".thank_box").css('opacity', 0).css('z-index', 0);
        });
    }
}

function validateForm() {
    if ($("#name").val() == "") {
        $("#name + label").text("Напишите Ваше имя!").css('width', '100%').css('bottom', '0').css('border', '1px solid #c91616').css('height', 'auto').css('background-color', 'transparent');
        return;
    }

    let nameVal = /[a-z]{2,30}$/i;
    let myName = $("#name").val();
    let validName = nameVal.test(myName);
    if(validName == false) {
        $("#name + label").text("Напишите Ваше имя!").css('width', '100%').css('bottom', '0').css('border', '1px solid #c91616').css('height', 'auto').css('background-color', 'transparent');
        return;
    }

    if ($("#phone").val() == "") {
        $("#phone + label").text("Напишите Ваш номер телефона!").css('width', '100%').css('bottom', '0').css('border', '1px solid #c91616').css('height', 'auto').css('background-color', 'transparent');
        return;
    }

    let phoneVal = /^\d[\d\(\)\ -]{4,14}\d$/;
    let myPhone = $("#phone").val();
    let validPhone = phoneVal.test(myPhone);
    if(validPhone == false) {
        $("#phone + label").text("Номер телефона введен неправильно!").css('width', '100%').css('bottom', '0').css('border', '1px solid #c91616').css('height', 'auto').css('background-color', 'transparent');
        return;
    }

    if ($("#email").val() == "") {
        $("#email + label").text("Напишите Ваш e-mail!").css('width', '100%').css('bottom', '0').css('border', '1px solid #c91616').css('height', 'auto').css('background-color', 'transparent');
        return;
    }

    let emailVal = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    let myMail = $("#email").val();
    let validEmail = emailVal.test(myMail);
    if (validEmail == false) {
        $("#email + label").text("Введите корректный E-mail типа name@mail.com!").css('width', '100%').css('bottom', '0').css('border', '1px solid #c91616').css('height', 'auto').css('background-color', 'transparent');
        return;
    }

    if ($("#message").val() == "") {
        $("#message + label").text("Напишите Ваше сообщение!").css('width', '100%').css('bottom', '0').css('border', '1px solid #c91616').css('height', 'auto').css('background-color', 'transparent');
        return;
    }
    if ($("#message").val().length < 5) {
        $("#message + label").text("Длинна сообщения должна быть не менее 5 символов!").css('width', '100%').css('bottom', '0').css('border', '1px solid #c91616').css('height', 'auto').css('background-color', 'transparent');
        return;
    }    

    sendForm();
}
