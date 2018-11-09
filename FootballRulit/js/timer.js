var baseTimeKoef = 60;
var clocktimer, baseDateForTimer;
var readoutTimer = '';

//функция для очистки поля
function ClearСlock() {
    clearTimeout(clocktimer);
    readoutTimer = '00:00';
    $('.stopwatch').html(readoutTimer);
}

//функция для старта секундомера
function StartTIME() {
    var now = new Date();
    var diff = now - baseDateForTimer;
    var diffAbs = Math.abs(diff) / 1000;
    var minutes = ((diffAbs / baseTimeKoef) | 0) + "";
    var seconds = ((diffAbs - minutes * baseTimeKoef) | 0) + "";
    readoutTimer =
        ((diff < 0) ? "- " : "") +
        (minutes.length == 1 ? "0" + minutes : minutes)
        + ":" +
        (seconds.length == 1 ? "0" + seconds : seconds);
    $('.stopwatch').html(readoutTimer);
    clocktimer = setTimeout("StartTIME()", 100);
}

function timerInit(date) {
    ClearСlock();
    baseDateForTimer = date;
    StartTIME();
}