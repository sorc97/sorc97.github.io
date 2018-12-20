'use strict'

let $bet = $(".game__main_betField_bet");
let matchInfo = document.querySelector(".game__side_information_matchWrapper");
let playerInfo = document.querySelector(".game__side_information_player");
let messageArea = document.querySelector(".game__side_messages");
let fieldArea = document.querySelector(".game__betField");
let betTable = document.querySelector(".game__betField_table");
let accept = document.querySelector(".game__main_management_accept");
let cancel = document.querySelector(".game__main_management_cancel");
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

let $accordionItem = $(".accordion__item");
let $headline = $(".game__history_headline");

var matchId = document.location.href.match(/match\/[0-9]*/)[0].replace("match/", "");

// function setTableTooltipPosition() {
// 	let coords = goal.getBoundingClientRect();
// 	tableTooltip.style.width = goal.clientWidth + "px";
// 	tableTooltip.style.height= 77 + "px";
// 	tableTooltip.style.left = coords.left + 8 + "px";
// 	tableTooltip.style.top = coords.top - tableTooltip.clientHeight - 5 + "px";
// }

// setTableTooltipPosition();

// $bet.on('click', function(e) {
// 	if(this.querySelector(".chip")) {
// 		this.removeChild(this.querySelector(".chip"));
// 		this.innerHTML = this.coef;
// 		return;
// 	}

// 	this.coef = this.innerHTML;
// 	this.innerHTML = "";
// 	this.appendChild(new Chip());
// 	console.log(this.coef);
// });

// $bet.on('mousedown', function(e){return false});

$complex.on('click', function(e){
    let next = this.nextElementSibling;
    while($(next).attr("class") == "complex__item") {
        $(next).fadeToggle(500);

        next = next.nextElementSibling;
        if(next == null) break;
    }
});

function Chip() {
    let elem = document.createElement("div");
    elem.classList.add("chip");
    return elem;
}

function Message(options) {
    let elem = document.createElement("div");
    elem.classList.add("game__side_messages_item");
    elem.innerHTML = options.text;

    $(elem).hide();

    fieldArea.appendChild(elem);
    $(elem).fadeIn(500);

    setTimeout(() => {
        $(elem).fadeOut(500);
        setTimeout(() => fieldArea.removeChild(elem), 500);
    }, 2000);
}

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

function setChip(event) {
    setChipValue(event.target.innerHTML);
    // activeBet.style.fontWeight = 700;

    // activeBet.innerHTML = "";
    // activeBet.appendChild(new Chip(event.target.innerHTML));
    // betWindow.classList.remove("active");
    closeBetWindow();
}

function setChipValue(value) {
    activeBet.classList.add('active');
    activeBet.dataset.sum = verifyInput(value, 0, 10000);
    activeBet.innerHTML = verifyInput(value, 0, 10000);
}

function verifyInput(number, min, max) {
    if (number > min && number < max) return number;
    else return 0;
}

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


accept.onclick = function (e) {
    var bets = $('.game__betField_bet.active').toArray().map(function (e) {
        return {"event": e.dataset.uniq_event, "kef": e.dataset.kef, "sum": e.dataset.sum}
    });
    var req = {"matchId": matchId, "bets": bets};

    sendPost("/api/bets/add", req, function (data) {
        if (data.error === null) {
            new Message({text: "Пари зафиксированно"});
            canselPari();
            updateInfo()
        } else {
            new Message({text: "Пари не было зафиксированно"});
        }
    });
}

cancel.onclick = function (e) {
    canselPari()
    new Message({text: "Пари сброшено"});
};

function canselPari() {
    $('.game__betField_bet.active').toArray().forEach(function (e) {
        e.classList.remove('active');
        e.innerHTML = e.dataset.kef;
    })
}

//----------------------------------------------------------------------------------------------

function sendPost(url, data, success) {
    var session = getToken();
    $.ajax({
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
        var content = data.data.reverse();
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
            var freezedTimer = (first.freezedAt!==null) ? Math.round((first.acceptedTime - first.freezedAt) / 1000) : first.deadZoneSize;
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
            html += '<td>' + formatHHmm(new Date(first.acceptedTime)) + '</td>';
            html += '<td></td>';
            html += '<td>' + cmplxSum + '</td>';
            html += '<td></td>';
            html += '</tr>';
            cmplx.forEach(function (bet) {
                html += '<tr>'; // class="complex__item"
                html += '<td>' + formatHHmm(new Date(bet.acceptedTime)) + '</td>';
                html += '<td>' + bet.event + '</td>';
                html += '<td>' + bet.sum + '</td>';
                html += '<td>' + bet.kef + '</td>';
                html += '</tr>';
            })
        } else {
            var bet = cmplx[0];
            html += '<tr>';
            html += '<td>' + formatHHmm(new Date(bet.acceptedTime)) + '</td>';
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
    let html = '<tbody>';
    betsGroupedForComplex(bets).forEach(function (cmplx) {
        if (cmplx.length > 1) {
            var first = cmplx[0];
            var cmplxSum = cmplx.map(e => e.sum).reduce((a, b) => a + b, 0);
            var cmplxWin = cmplx.map(e => betWinForCalculated(e)).reduce((a, b) => a + b, 0);
            var cmplxBalance = (cmplxWin - cmplxSum);
            html += '<tr class="complex">';
            html += '<td>' + formatHHmm(new Date(first.acceptedTime)) + '</td>';
            html += '<td></td>';
            html += '<td>' + cmplxSum + '</td>';
            html += '<td></td>';
            html += '<td>' + cmplxWin + '</td>';
            html += '<td>' + cmplxBalance + '</td>';
            html += '</tr>';
            cmplx.forEach(function (bet) {
                var betWin = betWinForCalculated(bet);
                html += '<tr>'; //class="complex__item"
                html += '<td>' + formatHHmm(new Date(bet.acceptedTime)) + '</td>';
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
            html += '<tr>';
            html += '<td>' + formatHHmm(new Date(bet.acceptedTime)) + '</td>';
            html += '<td>' + bet.event + '</td>';
            html += '<td>' + bet.sum + '</td>';
            html += '<td>' + bet.kef + '</td>';
            html += '<td>' + betWin + '</td>';
            html += '<td>' + (betWin - bet.sum) + '</td>';
            html += '</tr>';
        }
    });
    html += '</tbody>';

    $('.calculated_bets_table>tbody').replaceWith(html);
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
        var content = '';
        content += '<tbody>';
        data.data.reverse().forEach(function (obj) {
            if (obj.eventFormat === "PLAYABLE") {
                var eventName = obj.playableEvent;
                content += '<tr>';
                content += '<td>' + formatHHmm(new Date(obj.arbiterTime)) + '</td>';
                content += '<td>' + eventName + '</td>';
                content += '</tr>';
            }
        });
        content += '</tbody>';
        $('table.game__messages_table>tbody').replaceWith(content);
    })
}

function updateMatchInfo() {
    sendPost("/api/matches/info", {id: matchId}, function (data) {
        var match = data.data.match;
        $('.game__side_information_match_half').html(match.half);
        $('.game__side_information_match_score').html(match.score);
        if (match.teamsChanged) {
            $('.game__side_information_match_team1').html(match.team1Name);
            $('.game__side_information_match_team2').html(match.team2Name);
        } else {
            $('.game__side_information_match_team1').html(match.team2Name);
            $('.game__side_information_match_team2').html(match.team1Name);
        }
        matchTimer(new Date(match.startTime), '.stopwatch')
    })
};

function updateInfo() {
    updateBetsHistory();
    updateEvents();
    updateMatchInfo();
}

updateInfo();
setInterval(() => {
    updateInfo()
}, 5000);


function formatHHmm(date) {
    var h = '' + date.getHours();
    var hh = h.length !== 2 ? '0' + h : h;
    var m = '' + date.getMinutes();
    var mm = m.length !== 2 ? '0' + m : m;
    var s = '' + date.getSeconds();
    var ss = s.length !== 2 ? '0' + s : s;
    return hh + ':' + mm + ':' + ss
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

