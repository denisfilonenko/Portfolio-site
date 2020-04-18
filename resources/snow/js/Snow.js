
let countS = 1;

function SnowflakeMove() {
    for (let n = 0; n < countS; n++) {
        let nowTop = parseInt(   $("#snowflake" + n).css("top") );
        let nowLeft = parseInt(   $("#snowflake1" + n).css("left") );
        if (nowTop > window.innerHeight - 75) {
            nowTop = 0;
            nowLeft = Math.random() * (window.innerWidth - 75 ) + 20;
        }
        $("#snowflake" + n).css("top", (nowTop + 1) + "px" );
        $("#snowflake" + n).css("left", (nowLeft + 1) + "px" );
        $("#snowflake" + n).css("animation", "snow 20s infinite");
    }
    $(".snowflake").mouseover(function() {
        $(this).remove();
    });
}

let s = setInterval(SnowflakeMove, 7);

function getXpositionOfElement() {
    let x_position = Math.floor(Math.random() * window.innerWidth);
    return x_position;
}

function getYpositionOfElement() {
    let y_position = Math.floor(Math.random() * window.innerHeight);
    return y_position;
}

function createSnowflake (){
    $("body").append('<div id="snowflake' +  countS + '" class="snowflake"' +'></div>');
    $("#snowflake" + countS).css({'left': getXpositionOfElement()});
    countS++;
    $(".snowflake").mouseover(function() {
        $(this).remove();
    });
}

function createSnowfall (){
    for (let i = 0; i < 120; i++) {
        $("body").append('<div id="snowflake' + i + '" class="snowflake"' +'></div>');
        $("#snowflake" + i).css({'left': getXpositionOfElement()});
        $("#snowflake" + i).css({'top': getYpositionOfElement()});
        countS++;
    }
    $(".snowflake").mouseover(function() {
        $(this).remove();
    });
}





