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
let isBetActive = false;
let prevTarget;
let $complex = $(".complex");
let $windowChip = $(".game__betWindow_chip");
let activeBet;
let ex = document.getElementById("exept2");
let square = document.getElementById("square");
var userChip = document.querySelector(".game__betWindow_userChip");

let $accordionItem = $(".accordion__item");
let $headline = $(".game__history_headline");

function setMatchInfo(options) {
	let elem = document.createElement("div");
	elem.className = "game__side_information_match";
	elem.innerHTML = `<strong>Матч</strong>: ${options.name} <br> <strong>Время</strong>: ${options.time} <strong>Тайм</strong>: ${options.half}
	<br> <strong>Счет</strong>: ${options.score}`;

	matchInfo.insertBefore(elem, matchInfo.firstElementChild);
}

function setPlayerInfo(options) {
	playerInfo.innerHTML = `<u>Баланс</u>: <strong>${options.score}</strong>  <br>
							<u>Пари заключено на сумму</u>: ${options.betAmount} <br>
							<u>Пари выплачено на сумму</u>: ${options.bet} <br>
							<u>Баланс текущей игры</u>: ${options.betAmount - options.bet}`
}


// function Message(options) {
// 	let elem = document.createElement("div");
// 	elem.classList.add("game__side_messages_item");
// 	elem.innerHTML = options.text;

// 	$(elem).hide();

// 	fieldArea.appendChild(elem);
// 	$(elem).fadeIn(500);

// 	setTimeout(() => {
// 		$(elem).fadeOut(500);
// 		setTimeout(() => fieldArea.removeChild(elem), 500);
// 	}, 2000);
// }

function getCoords(elem) {
	let coords = elem.getBoundingClientRect();

	return {
		top: coords.top + fieldArea.scrollTop,
		left: coords.left + pageXOffset
	}
}

betTable.onclick = function(event) {
	let target = event.target;

	while(target != betTable) {
		if(target.tagName == "TD") {
			setBetWindowCoords(target);
			activeBet = target;
			return;
		}

		target = target.parentNode;
	}
}

betTable.onmousedown = function(event) {return false};


function NoAccept(options) {
	let elem = document.createElement("div");
	elem.classList.add("game__history_item");

	if(!options.accept) {
		elem.innerHTML = `<u>Таймер</u>: <strong>${options.timer}</strong> <u>Пари на сумму</u>: <strong>${options.amount}</strong>`;
	} else {
		elem.innerHTML = `<u>Время</u>: <strong>${options.time}</strong> <u>Пари на сумму</u>: <strong>${options.amount}</strong>`;
	}

	historyWrapper.insertBefore(elem, historyWrapper.firstChild);

	elem.onmousedown = function() {
		return false;
	}
}

function Event(options) {
	let elem = document.createElement("tr");
	elem.innerHTML = `<td>${options.time}</td><td>${options.event}</td>`

	messagesTable.appendChild(elem);
}

new Event({time: "22:12", event: "Аут на <br> левой половине"});
new Event({time: "22:54", event: "Угловой на поле"});
new Event({time: "23:30", event: "Аут на <br> левой половине <br> низ"});
new Event({time: "32:43", event: "Гол на поле"});
new Event({time: "33:30", event: "Удар от ворот на <br> левой половине"});

let wrapHeight = fieldArea.clientHeight;

function setBetWindowCoords(target) {
	let coords = getCoords(target);
	let top = coords.top + target.clientHeight;
	let left = coords.left + target.clientWidth/2;

	if(prevTarget && prevTarget != target) prevTarget.classList.remove("active");


	if(target == prevTarget) {
		betWindow.classList.toggle("active");
		target.classList.toggle("active");
		clearUserChip();
	}else {		
		betWindow.classList.add("active");
		target.classList.toggle("active");
		clearUserChip();	
	}
	
	betWindow.style.left = left - betWindow.clientWidth/2 + "px";

	if(top + betWindow.clientHeight > wrapHeight) {
		betWindow.style.top = top - target.clientHeight - betWindow.clientHeight - 5+ "px";
		betWindow.classList.add("bot");
		betWindow.classList.remove("top");
	}else{
		betWindow.style.top = top + "px";
		betWindow.classList.remove("bot");
		betWindow.classList.add("top");
	}
	
	let edge = getCoords(betWindow).top + betWindow.clientHeight;


	isBetActive = true;
	prevTarget = target;
}

function closeBetWindow() {
	betWindow.classList.remove("active");
	clearUserChip();
}

$headline.on('click', function(e){
	// this.nextElementSibling.classList.toggle("show");
	$(this).next().fadeToggle(400);
})

$headline.on('mousedown', function(e){
	return false;
})

$(".complex").on('click', function(e) {
	let next = this.nextElementSibling;
	// console.log(next);
	while(next.className == "complex__item") {
		// $(next).toggleClass("showRow");
		// $(next).attr("class") === "complex__item showRow"

		$(next).fadeToggle(500);
		next = next.nextElementSibling;
		if(next == null) break;
	}
	// next = null;
});

$(".game__betField_bet").on('mouseenter', function(e) {
	let direction = document.getElementById(this.getAttribute("data-direction"));
	let secondDirection = document.getElementById(this.getAttribute("data-secondDirection"));
	let event = document.getElementById(this.getAttribute("data-event"));

	if(secondDirection) secondDirection.classList.add("highlight");

	direction.classList.add("highlight");
	event.classList.add("highlight");
	setTableTooltip(this.getAttribute("data-event"), this.getAttribute("data-direction"), this.getAttribute("data-secondDirection"));
});

let toolTipTimer;

$(".game__betField_bet").on('mouseleave', function(e) {
	let direction = document.getElementById(this.getAttribute("data-direction"));
	let secondDirection = document.getElementById(this.getAttribute("data-secondDirection"));
	let event = document.getElementById(this.getAttribute("data-event"));

	if(secondDirection) secondDirection.classList.remove("highlight");

	direction.classList.remove("highlight");
	event.classList.remove("highlight");
	if(toolTipTimer) clearTimeout(toolTipTimer);
	// toolTipTimer = setTimeout(()=> removeTableTooltip(), 500);
	removeTableTooltip();
});

// $(".game__betField_bet").on('click', function(event) {

// })

function setTableTooltip(event, direction, secondDirection) {
	let message = "";

	switch(event) {
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

	switch(direction) {
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

	switch(secondDirection) {
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


function Chip(value) {
	let elem = document.createElement("div");
	elem.classList.add("chip");
	elem.innerHTML = value;
	return elem;
}

function setChip(event) {
	setChipValue(event.target.innerHTML);
	closeBetWindow();
}

function setChipValue(value) {
	if(value > 10000){
		activeBet.classList.remove("active");
		new Push("Вы превысили максимальную ставку!").show();
		return;
	}else if(value <= 0) {
		activeBet.classList.remove("active");
		new Push("Некорректный ввод").show();
		return;
	}

	activeBet.innerHTML = value;
	activeBet.classList.add("betOn");
}

// function verifyInput(number, min, max) {
// 	if(number > min && number <= max) return number;
// 	else return 0;
// }

$windowChip.on('click', setChip);

userChip.onkeydown = function(e) {
	if(e.keyCode == 13) {
		setChipValue(userChip.value);
		closeBetWindow();
	}

	if(e.keyCode == 189) e.preventDefault();
};

function clearUserChip() {
	userChip.value = "";
}

let repeatStorage = [];
// let repeatStorage = {};

accept.onclick = function(e) {
	new Push("Пари зафиксированно").temporarily();

	$(".game__betField_bet").toArray().forEach((item, i)=>{
		if(item.classList.contains("betOn")){
			repeatStorage[i] = {status: 1, value: item.innerHTML};
		}else{
			repeatStorage[i] = {status: 0, value: 0};
		}
	});

	console.log(repeatStorage);
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


// setTimeout(()=> toggleDisableBut(), 5000);

function toggleDisableBut() {
    if(accept.classList.contains("disabled")) {
        accept.classList.remove("disabled");
        accept.disabled = false;
    }else{
        accept.classList.add("disabled");
        accept.disabled = true;
    }
}



cancel.onclick = function(e) {
	// new Message({text: "Пари сброшено"});
	new Push("Пари отменено").show();
	// $(".game__betField_bet").toArray().forEach((item)=>{
	// 	if(item.classList.contains("betOn"));
	// });
	$(".game__betField_bet.betOn").toArray().forEach((item)=>{
		item.classList.remove("betOn");
		item.classList.remove("active");
		item.innerHTML = "";
	});
}

setPlayerInfo({
	score: 250,
	betAmount: 200,
	bet: 50
})

setMatchInfo({
	name: "CSKA-SPARTAK",
	time: "19:23",
	half: "1",
	score: "2 - 1"
});



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