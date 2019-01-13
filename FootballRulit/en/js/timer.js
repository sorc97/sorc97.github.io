var match_baseTimeKoef = 60;
var match_clocktimer;
var betsIds = [];

function matchTimer(date, selector) {
    //clear
    clearTimeout(match_clocktimer);
    $(selector).html('00:00');

    StartTIME(selector, date, match_baseTimeKoef);
}

function betTimer(date, selector, id) {
    if (betsIds.indexOf(id) === -1) {
        betsIds.push(id);
        var clock = {clocktimer: ""};

        //clear
        clearTimeout(clock.clocktimer);
        $(selector).html('00');

        StartSecondsTIMER(selector, date, clock);
    }
}

//функция для старта секундомера
function StartTIME(selector, baseDateForTimer, baseTimeKoef) {
    var now = new Date();
    var diff = now - baseDateForTimer;
    var diffAbs = Math.abs(diff) / 1000;
    var minutes = ((diffAbs / baseTimeKoef) | 0) + "";
    var seconds = ((diffAbs - minutes * baseTimeKoef) | 0) + "";
    var readoutTimer =
        ((diff < 0) ? "- " : "") +
        (minutes.length == 1 ? "0" + minutes : minutes)
        + ":" +
        (seconds.length == 1 ? "0" + seconds : seconds);
    $(selector).html(readoutTimer);
    match_clocktimer = setTimeout(StartTIME, 300, selector, baseDateForTimer, baseTimeKoef);
}

//функция для старта секундомера
function StartSecondsTIMER(selector, baseDateForTimer, clock) {
    var now = new Date();
    var diff = now - baseDateForTimer;
    var diffAbs = Math.abs(diff) / 1000;
    var seconds = ((diffAbs) | 0) + "";
    var readoutTimer =
        (diff > 0) ? "00" : (seconds.length == 1 ? "0" + seconds : seconds);
    $(selector).html(readoutTimer);
    if (diff < 0) {
        clock.clocktimer = setTimeout(StartSecondsTIMER, 300, selector, baseDateForTimer, clock);
    }else{
        updateInfo()
    }
}