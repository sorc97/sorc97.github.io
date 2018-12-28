'use strict'

let $bet = $(".game__main_betField_bet");
let matchInfo = document.querySelector(".game__side_information_matchWrapper");
let playerInfo = document.querySelector(".game__side_information_player");
let messageArea = document.querySelector(".game__side_messages");
let fieldArea = document.querySelector(".game__betField");
let betTable = document.querySelector(".game__betField_table");
let accept = document.querySelector(".game__main_management_accept");
let cancel = document.querySelector(".game__main_management_cancel");
let repeat = document.querySelector(".game__main_management_repeat");
let historyWrapper = document.querySelector(".game__history_itemWrapper");
let betWindow = document.querySelector(".game__betWindow");
let bet = document.querySelector(".game__betField_bet");
let messagesTable = document.querySelector(".game__messages_table");
let tableTooltip = document.querySelector(".game__betField_tableTooltip");
let prevTarget;
let $complex = $(".complex");
let $windowChip = $(".game__betWindow_chip");
let activeBet;
let ex = document.getElementById("exept2");
let square = document.getElementById("square");
var userChip = document.querySelector(".game__betWindow_userChip");
let repeatStorage = [];

let $accordionItem = $(".accordion__item");
let $headline = $(".game__history_headline");

var matchId = document.location.href.match(/match\/[0-9]*/)[0].replace("match/", "");


$complex.on('click', function (e) {
    let next = this.nextElementSibling;
    while ($(next).attr("class") == "complex__item") {
        $(next).fadeToggle(500);

        next = next.nextElementSibling;
        if (next == null) break;
    }
});

function Chip() {
    let elem = document.createElement("div");
    elem.classList.add("chip");
    return elem;
}

// function Message(options) {
//     let elem = document.createElement("div");
//     elem.classList.add("game__side_messages_item");
//     elem.innerHTML = options.text;

//     $(elem).hide();

//     fieldArea.appendChild(elem);
//     $(elem).fadeIn(500);

//     setTimeout(() => {
//         $(elem).fadeOut(500);
//         setTimeout(() => fieldArea.removeChild(elem), 500);
//     }, 2000);
// }

function getCoords(elem) {
    let coords = elem.getBoundingClientRect();

    return {
        top: coords.top + fieldArea.scrollTop,
        left: coords.left + pageXOffset
    }
}

betTable.onclick = function (event) {
    let target = event.target;

    while (target != betTable) {
        if (target.tagName == "TD") {
            setBetWindowCoords(target);
            activeBet = target;
            return;
        }

        target = target.parentNode;
    }
}

betTable.onmousedown = function (event) {
    return false
};

let wrapHeight = fieldArea.clientHeight;

function setBetWindowCoords(target) {
    let coords = getCoords(target);
    let top = coords.top + target.clientHeight;
    let left = coords.left + target.clientWidth / 2;

    if (target == prevTarget) {
        betWindow.classList.toggle("active");
    } else {
        betWindow.classList.add("active");
    }

    betWindow.style.left = left - betWindow.clientWidth / 2 + "px";

    if (top + betWindow.clientHeight > wrapHeight) {
        betWindow.style.top = top - target.clientHeight - betWindow.clientHeight - 5 + "px";
        betWindow.classList.add("bot");
        betWindow.classList.remove("top");
    } else {
        betWindow.style.top = top + "px";
        betWindow.classList.remove("bot");
        betWindow.classList.add("top");
    }

    let edge = getCoords(betWindow).top + betWindow.clientHeight;

    prevTarget = target;
}

function closeBetWindow() {
    betWindow.classList.remove("active");
    clearUserChip();
}

$headline.on('click', function (e) {
    // this.nextElementSibling.classList.toggle("show");
    $(this).next().fadeToggle(400);
})

$headline.on('mousedown', function (e) {
    return false;
})


$(".game__betField_bet").on('mouseenter', function (e) {
    let direction = document.getElementById(this.getAttribute("data-direction"));
    let secondDirection = document.getElementById(this.getAttribute("data-secondDirection"));
    let event = document.getElementById(this.getAttribute("data-event"));

    if (secondDirection) secondDirection.classList.add("highlight");

    direction.classList.add("highlight");
    event.classList.add("highlight");
    setTableTooltip(this.getAttribute("data-event"), this.getAttribute("data-direction"), this.getAttribute("data-secondDirection"));
});

let toolTipTimer;

$(".game__betField_bet").on('mouseleave', function (e) {
    let direction = document.getElementById(this.getAttribute("data-direction"));
    let secondDirection = document.getElementById(this.getAttribute("data-secondDirection"));
    let event = document.getElementById(this.getAttribute("data-event"));

    if (secondDirection) secondDirection.classList.remove("highlight");

    direction.classList.remove("highlight");
    event.classList.remove("highlight");
    if (toolTipTimer) clearTimeout(toolTipTimer);
    toolTipTimer = setTimeout(() => removeTableTooltip(), 2000);
});

function setTableTooltip(event, direction, secondDirection) {
    let message = "";

    switch (event) {
        case "goal":
            message = "Гол на <br>";
            break;

        case "fine":
            message = "Штрафной на <br>";
            break;

        case "offside":
            message = "Офсайд на <br>";
            break;

        case "goalKick":
            message = "Удар от ворот на<br>";
            break;

        case "out":
            message = "Аут на <br>";
            break;

        case "corner":
            message = "Угловой на <br>";
            break;

    }

    switch (direction) {
        case "left":
            message += "левой половине";
            break;

        case "all":
            message += "поле";
            break;

        case "right":
            message += "правой половине";
            break;


    }

    switch (secondDirection) {
        case "top":
            message += "<br> верх";
            break;

        case "down":
            message += "<br> низ";
            break;

        case "topCorner":
            message += "<br> верх";
            break;

        case "downCorner":
            message += "<br> низ";
            break;


        default:
            break;
    }


    tableTooltip.style.opacity = 1;
    tableTooltip.innerHTML = message;
}

function removeTableTooltip() {
    tableTooltip.style.opacity = 0;
}


function setCellWidth() {
    square.style.width = ex.offsetWidth / 2 + "px";
    square.style.padding = 0;
}

//Заполнение полей ставками

function setChip(event) {
    setChipValue(event.target.innerHTML);
    closeBetWindow();
}

function setChipValue(value) {
    if (value > 10000) {
        activeBet.classList.remove("active");
        new Push("Вы превысили максимальную ставку!").temporarily();
        return;
    } else if (value <= 0) {
        activeBet.classList.remove("active");
        new Push("Некорректный ввод").temporarily();
        return;
    }

    activeBet.classList.add("betOn");
    activeBet.innerHTML = value;
    activeBet.dataset.sum = value;
}

// function verifyInput(number, min, max) {
//     if (number > min && number < max) return number;
//     else return 0;
// }

$windowChip.on('click', setChip);

userChip.onkeydown = function (e) {
    if (e.keyCode == 13) {
        setChipValue(userChip.value);
        closeBetWindow();
    }

    if (e.keyCode == 189) e.preventDefault();
};

function clearUserChip() {
    userChip.value = "";
}

//Блокировка/разблокировка кнопки
function toggleDisableBut() {
    if (accept.classList.contains("disabled")) {
        accept.classList.remove("disabled");
        accept.disabled = false;
    } else {
        accept.classList.add("disabled");
        accept.disabled = true;
    }
}

accept.onclick = function (e) {
    toggleDisableBut();
    var bets = $('.game__betField_bet.betOn').toArray().map(function (e) {
        return {"event": e.dataset.uniq_event, "kef": e.dataset.kef, "sum": e.dataset.sum}
    });
    var req = {"matchId": matchId, "bets": bets};

    sendPost("/api/bets/add", req, function (data) {
        toggleDisableBut();
        if (data.error === null) {
            new Center("Пари зафиксированно").temporarily();
            //запись активных элементов
            $(".game__betField_bet").toArray().forEach((item, i)=>{
                if(item.classList.contains("betOn")){
                    repeatStorage[i] = {status: 1, value: item.innerHTML};
                }else{
                    repeatStorage[i] = {status: 0, value: 0};
                }
            });

            canselPari();
            updateInfo();
        } else {
            new Center("Пари не было зафиксированно").temporarily();
        }
    }).fail(function () {
        toggleDisableBut();
    })
}

repeat.onclick = function(e) {
    let currentField = document.getElementsByClassName("game__betField_bet");

    repeatStorage.forEach((item, i)=> {
        if(item.status){
            currentField[i].classList.add("betOn");
            currentField[i].innerHTML = item.value;
        }
    });
}

cancel.onclick = function (e) {
    canselPari();
    new Center("Пари сброшено").temporarily();
};

function canselPari() {
    $('.game__betField_bet.betOn').toArray().forEach(function (e) {
        e.classList.remove('betOn');
        e.innerHTML = e.dataset.kef;
    })
}

//УВЕДОМЛЕНИЯ

class Notyfication{
    constructor(options) {
        var elem = document.createElement("div");
        elem.className = "notyfication";

        elem.innerHTML = options.text;
        elem.classList.add(options.type);

        elem.render = ()=> {
            fieldArea.appendChild(elem);
        };

        elem.hide = ()=> {
            elem.classList.remove("active");
            setTimeout(()=> fieldArea.removeChild(elem), 1000);
        }

        elem.temporarily = ()=> {
            elem.render();
            setTimeout(()=> elem.classList.add("active"), 100);
            setTimeout(()=> elem.hide(), 2000);
        }

        return elem;
    }
}


class Push extends Notyfication{
    constructor(content){
        let elem = super({type: "push", text: content});
        elem.show = ()=> {
            elem.render();
            setTimeout(()=> elem.classList.add("active"), 100);
        }
    }
}

class Center extends Notyfication{
    constructor(content) {
        let elem = super({type: "center", text: content});
        elem.show = ()=> {
            elem.render();
            setTimeout(()=> elem.classList.add("active"), 100);
        }
    }
}

//----------------------------------------------------------------------------------------------

function sendPost(url, data, success) {
    var session = getToken();
    return $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        headers: {
            "Authorization": 'Bearer ' + session
        },
        dataType: "json",
        success: success
    });
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getToken() {
    return decodeURIComponent(getCookie("USER_SESSION").replace(/\+/g, ' ')).replace("jwt\=#s", "").replace(/\"/g, "");
}


//ленты событий и ставок

function updateBetsHistory() {
    sendPost("/api/bets/history", {id: matchId}, function (data) {
        var content = data.data;
        var nonaccepted = content.filter(function (e) {
            return e.acceptedTime > Date.now() || e.status === "FREEZED"
        });
        var accepted = content.filter(function (e) {
            return e.acceptedTime <= Date.now() && e.status === "NOTCALC"
        });
        var calculated = content.filter(function (e) {
            return e.acceptedTime <= Date.now() && (e.status !== "NOTCALC" && e.status !== "FREEZED")
        });
        nonAcceptedBetsUpdate(nonaccepted);
        acceptedBetsUpdate(accepted);
        calculatedBetsUpdate(calculated);
        balanceUpdate(calculated)
    })
}


function nonAcceptedBetsUpdate(bets) {
    let html = '<tbody>';
    betsGroupedForComplex(bets).forEach(function (cmplx) {
        var cmplxSum = cmplx.map(e => e.sum).reduce((a, b) => a + b, 0);
        var first = cmplx[0];
        var timerSeconds = Math.round((first.acceptedTime - Date.now()) / 1000) + '';
        var timerStr = timerSeconds.length === 1 ? '0' + timerSeconds : timerSeconds;
        if (first.status === "NOTCALC") {
            html += '<tr>';
            html += '<td class="bet_timer_' + first.id + '">' + timerStr + '</td>';
            html += '<td>' + cmplxSum + '</td>';
            html += '</tr>';
            betTimer(new Date(first.acceptedTime), '.bet_timer_' + first.id, first.id)
        } else { //freezed
            var freezedTimer = (first.freezedAt !== null) ? (((first.acceptedTime - first.freezedAt) / 1000) | 0) : first.deadZoneSize;
            var freezedTimerStr = freezedTimer.length === 1 ? '0' + freezedTimer : freezedTimer;
            html += '<tr class="timer_freezed">';
            html += '<td>' + freezedTimerStr + '</td>';
            html += '<td>' + cmplxSum + '</td>';
            html += '</tr>';
        }
    });

    html += '</tbody>';

    $('.nonaccepted_bets_table>tbody').replaceWith(html);
}

function acceptedBetsUpdate(bets) {
    let html = '<tbody>';
    betsGroupedForComplex(bets).forEach(function (cmplx) {
        if (cmplx.length > 1) {
            var first = cmplx[0];
            var cmplxSum = cmplx.map(e => e.sum).reduce((a, b) => a + b, 0);
            html += '<tr class="complex">';
            html += '<td>' + formatSeconds(first.relTime) + '</td>';
            html += '<td></td>';
            html += '<td>' + cmplxSum + '</td>';
            html += '<td></td>';
            html += '</tr>';
            cmplx.forEach(function (bet) {
                html += '<tr class="complex__item">';
                html += '<td>' + formatSeconds(bet.relTime) + '</td>';
                html += '<td>' + bet.event + '</td>';
                html += '<td>' + bet.sum + '</td>';
                html += '<td>' + bet.kef + '</td>';
                html += '</tr>';
            })
        } else {
            var bet = cmplx[0];
            html += '<tr>';
            html += '<td>' + formatSeconds(bet.relTime) + '</td>';
            html += '<td>' + bet.event + '</td>';
            html += '<td>' + bet.sum + '</td>';
            html += '<td>' + bet.kef + '</td>';
            html += '</tr>';
        }
    });
    html += '</tbody>';

    $('.accepted_bets_table>tbody').replaceWith(html);
}

function calculatedBetsUpdate(bets) {
    var existsItems = $('.calculated_bets_table>tbody tr');
    var lastItemDate = existsItems.length > 0 ? existsItems[0].dataset.date : null;
    var items = bets.filter(item => item.writeTime > lastItemDate);
    let html = '';
    betsGroupedForComplex(items).forEach(function (cmplx) {
        if (cmplx.length > 1) {
            var first = cmplx[0];
            var cmplxSum = cmplx.map(e => e.sum).reduce((a, b) => a + b, 0);
            var cmplxWin = cmplx.map(e => betWinForCalculated(e)).reduce((a, b) => a + b, 0);
            var cmplxBalance = (cmplxWin - cmplxSum);
            html += '<tr class="complex" data-date="' + first.writeTime + '">';
            html += '<td>' + formatSeconds(first.relTime) + '</td>';
            html += '<td></td>';
            html += '<td>' + cmplxSum + '</td>';
            html += '<td></td>';
            html += '<td>' + cmplxWin + '</td>';
            html += '<td>' + cmplxBalance + '</td>';
            html += '</tr>';
            cmplx.forEach(function (bet) {
                var betWin = betWinForCalculated(bet);
                html += '<tr class="complex__item">';
                html += '<td>' + formatSeconds(bet.relTime) + '</td>';
                html += '<td>' + bet.event + '</td>';
                html += '<td>' + bet.sum + '</td>';
                html += '<td>' + bet.kef + '</td>';
                html += '<td>' + betWin + '</td>';
                html += '<td>' + (betWin - bet.sum) + '</td>';
                html += '</tr>';
            })
        } else {
            var bet = cmplx[0];
            var betWin = betWinForCalculated(bet);
            html += '<tr data-date="' + bet.writeTime + '">';
            html += '<td>' + formatSeconds(bet.relTime) + '</td>';
            html += '<td>' + bet.event + '</td>';
            html += '<td>' + bet.sum + '</td>';
            html += '<td>' + bet.kef + '</td>';
            html += '<td>' + betWin + '</td>';
            html += '<td>' + (betWin - bet.sum) + '</td>';
            html += '</tr>';
        }
    });

    $('.calculated_bets_table>tbody').prepend(html);
}

function balanceUpdate(bets) {
    var fullSum = 0;
    var fullWin = 0;
    bets.forEach(function (bet) {
        fullSum += bet.sum;
        fullWin += betWinForCalculated(bet);
    });

    $('#game__side_information_player_sum').html(fullSum);
    $('#game__side_information_player_win').html(fullWin);
    $('#game__side_information_player_balance').html(fullWin - fullSum);
}

function betWinForCalculated(bet) {
    var betWin = 0;
    if (bet.status === "WIN") {
        betWin = (bet.sum * bet.kef);
    } else if (bet.status === "RETURN") {
        betWin = bet.sum
    }
    return betWin;
}

function betsGroupedForComplex(bets) {
    return groupBy(bets, item => item.userId + item.companyId + item.acceptedTime)
}

function updateEvents() {
    sendPost("/api/events/list", {id: matchId}, function (data) {
        var existsItems = $('.game__messages_table>tbody tr');
        var lastItemDate = existsItems.length > 0 ? existsItems[0].dataset.date : null;
        var items = data.data.filter(item => item.arbiterTime > lastItemDate);
        var content = '';
        items.forEach(function (obj) {
            var eventName = obj.playableEvent != null ? obj.playableEvent : obj.serviceEvent;
            if (obj.eventFormat === "SERVICE") {
                content += '<tr data-date="' + obj.arbiterTime + '"' + 'style="display: none;"' + '>';
            } else {
                content += '<tr data-date="' + obj.arbiterTime + '">';
            }
            content += '<td>' + formatSeconds(obj.relTime) + '</td>';
            content += '<td>' + eventName + '</td>';
            content += '</tr>';

            // обработка новых событий для отображения пушей
            if (existsItems.length > 0) {
                if (obj.serviceEvent === "HALF_ENDED") {
                    new Center("1-ый тайм завершен").show()
                }
                else if (obj.serviceEvent === "MATCH_ENDED") {
                    new Center("Матч завершен").show()
                }
            }
        });
        $('table.game__messages_table>tbody').prepend(content);
    })
}

var freezed = false;

function updateMatchInfo() {
    sendPost("/api/matches/info", {id: matchId}, function (data) {
        var match = data.data.match;
        $('.game__side_information_match_half').html(match.half);
        $('.game__side_information_match_score').html(match.score);
        if (match.teamsChanged) {
            $('.game__side_information_match_team1').html(match.team2Name);
            $('.game__side_information_match_team2').html(match.team1Name);

            $('.game__side_information_match_score1').html(match.score2Team);
            $('.game__side_information_match_score2').html(match.score1Team);
        } else {
            $('.game__side_information_match_team1').html(match.team1Name);
            $('.game__side_information_match_team2').html(match.team2Name);

            $('.game__side_information_match_score1').html(match.score1Team);
            $('.game__side_information_match_score2').html(match.score2Team);
        }
        matchTimer(new Date(match.relStartTime), '.stopwatch');

        if (match.status === "TIMER_FREEZE") {
            if (!freezed) {
                new Push("Таймер незаключенных пари заморожен").show();
                freezed = true;
            }
        } else if (!isActiveForBet(match.status)) {
            if (!accept.classList.contains("disabled")) {
                toggleDisableBut();
                new Push("Прием пари временно приостановлен").show();
            }
        } else {
            if (freezed) {
                new Push("Таймер незаключенных пари разморожен").hide();
                freezed = false;
            } else if (accept.classList.contains("disabled")) {
                toggleDisableBut();
                new Push("Прием пари возобновлен").hide();
            }
        }
    })
};

function isActiveForBet(status){
    return (status === "LIVE" || status === "EVENT_FIX" || status === "TIMER_FREEZE")
}


function updateInfo() {
    updateBetsHistory();
    updateEvents();
    updateMatchInfo();
}

updateInfo();
setInterval(() => {
    updateInfo()
}, 5000);

function formatSeconds(seconds) {
    var m = '' + ((seconds / 60) | 0);
    var mm = m.length < 2 ? '0' + m : m;
    var s = '' + (seconds % 60);
    var ss = s.length < 2 ? '0' + s : s;
    return mm + ':' + ss
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
