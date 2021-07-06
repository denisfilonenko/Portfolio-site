screen.orientation.lock('landscape');

function preload() {
    let preloader = $('#preloader');
    preloader.css('visibility', 'hidden');
}

setTimeout(preload, 300);

// #home animation

$('.menu a[data-file="index.html"]').addClass("active expand");
$('.menu a').mouseenter(function(){
    $('.active').removeClass('expand');
})
$('.menu a').mouseleave(function(){
    $('.active').addClass('expand');
})

let check = 0;
let sectionWidth = $("#home").width();
let menuWidth = $(".menu").width();
let startAnimateMenu = function() {
   $(".menu").stop().animate({
    left: 0
}, 500);
   $("#home").css("transform", "perspective(" + sectionWidth + ") rotateY(-30deg) ").css("transition-duration", ".5s");
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
    if ($(window).height() < 550) {
        $(".menu").stop().animate({
            left: -menuWidth + 'px'
        }, 500);
    } else {
        $(".menu").stop().animate({
            left: -menuWidth + 50 + 'px'
        }, 500);
    }
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
let menuCounter = 0;
$("aside").mouseenter(function () {   
    startAnimateMenu();
})
$("aside").mouseleave(function () {
    endAnimateMenu();
    menuCounter = 0;
})
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

    $(".menu a").on('click', function () {
      if ($(this).data("file") === undefined) return false;
      loadPage($(this).data("file"));
      menuCounter = 0;
      endAnimateMenu();
      window.scrollTo(0, 0);
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
                        $(".menu a").removeClass("active expand");
                        animateHome();
                        $('.menu a[data-file="index.html"]').addClass("active expand");
                        break;
                    }
                    case "about.html": {
                        $(".menu a").removeClass("active expand");
                        animateAbout();
                        $('.menu a[data-file="about.html"]').addClass("active expand");
                        break;
                    }
                    case "portfolio.html": {
                        $(".menu a").removeClass("active expand");
                        animatePortfolio();
                        $('.menu a[data-file="portfolio.html"]').addClass("active expand");
                        break;
                    }
                    case "contacts.html": {
                        $(".menu a").removeClass("active expand");
                        animateContacts();                        
                        $('.menu a[data-file="contacts.html"]').addClass("active expand");
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
    $("body").css('overflow', 'hidden hidden');
}

function animateAbout () {

    $("#preloader").css('visibility', 'visible');
    $(document).ready(function(){
        $("#preloader").css('visibility', 'hidden');
    })


    $(".about_box").animate({
        opacity: 0
    }, 0);

    $(".about_box").animate({
        opacity: 1
    }, 1200);




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
    'images/cordova.png','images/webpack.png','images/firebase.png', 'images/yarn.png', 'images/npm.png', 'images/node.png', 'images/flutter.png', 'images/html.png', 'images/CSS3.png', 'images/js.png', 'images/jquery.png', 
    'images/bootstrap4.png', 'images/sass.png', 'images/git.png',
    'images/ajax.png', 'images/vue.png', 'images/php.png', 'images/react.png'
    ];
    let sphereHeight = $('section').height() / 3.5;
    let sphereWidth = $('section').width() / 4;
    let sphereRad = 0;
    if (sphereWidth < sphereHeight) {
        sphereRad = sphereWidth;
    } else {
        sphereRad = sphereHeight;
    }
    let tagCloud = TagCloud('.tagCloud', myTags, {
    	radius: sphereRad,
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
            let elClass = $(data).attr('class');
            $("#btnLoadMoreProjects ~ ." + elClass).show(0, function() {
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
            clearForm();
        });
    }
}

function clearForm() {
    $("#name").val('');
    $("#phone").val('');
    $("#email").val('');
    $("#message").val('');
}

function errPrompt (el) {
    $(el).addClass("err");
}

$(document).on('input', function(ev) {
    $(ev.target).removeClass('err');
    $(ev.target).next('label').text('');
})

function validateForm() {
    if ($("#name").val() == "") {
        $("#name + label").text("Enter your name!");
        errPrompt("#name");
        return;
    }

    let nameVal = /[a-z]{2,30}$/i;
    let myName = $("#name").val();
    let validName = nameVal.test(myName);

    if(validName == false) {
        $("#name + label").text("Enter correct name!");
        errPrompt("#name");
        return;
    }

    $("#name").keyup(function() {

    })

    if ($("#phone").val() == "") {
        $("#phone + label").text("Enter your phone number!");
        errPrompt("#phone");
        return;
    }

    let phoneVal = /^\d[\d\(\)\ -]{4,14}\d$/;
    let myPhone = $("#phone").val();
    let validPhone = phoneVal.test(myPhone);
    if(validPhone == false) {
        $("#phone + label").text("Phone number is entered incorrectly!");
        errPrompt("#phone");
        return;
    }

    if ($("#email").val() == "") {
        $("#email + label").text("Enter your email!");
        errPrompt("#email");
        return;
    }

    let emailVal = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    let myMail = $("#email").val();
    let validEmail = emailVal.test(myMail);
    if (validEmail == false) {
        $("#email + label").text("Enter a valid email like name@mail.com!");
        errPrompt("#email");
        return;
    }

    if ($("#message").val() == "") {
        $("#message + label").text("Enter your message!");
        errPrompt("#message");
        return;
    }
    if ($("#message").val().length < 5) {
        $("#message + label").text("Message length must be at least 5 symbols!");
        errPrompt("#message");
        return;
    }    

    sendForm();
}


// translator

const translationRu = {
    home: {
        name: {
            firstName: "Денис",
            lastName: "Филоненко"
        },
        head: "Front-end разработчик"
    },
    about: {
        head2: "Обо мне",
        aboutBox: {
            head3: "Приветствую! Меня зовут Денис.",
            text1: "Около года я занимаюсь интенсивным обучением в сфере Front-end азработки. Испытываю огромный интерес к данной сфере и хочу связать с ней дальнейшую деятельность. В данный момент заканчиваю обучение в компьютерной академии ШАГ. Профессионального опыта пока не имею, но стремлюсь постоянно улушать свои навыки и осваивать новые. Умею работать в команде, легко нахожу общий язык с коллективом, обладаю чувством вкуса.",
            text2: "Нахожусь в поиске места работы, которое позволит мне начать профессиональную карьеру Front-end разработчика.",
            button: "РЕЗЮМЕ"
        },
        skillsBox: {
            
        }
        
    }
}