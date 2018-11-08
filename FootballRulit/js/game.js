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
let isBetActive = false;
let prevTarget;
let $complex = $(".complex");


let $accordionItem = $(".accordion__item");
let $headline = $(".game__history_headline");

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

function Chip() {
	let elem = document.createElement("div");
	elem.classList.add("chip");
	return elem;
}

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

betTable.onclick = function(event) {
	let target = event.target;

	while(target != betTable) {
		if(target.tagName == "TD") {
			setBetWindowCoords(target);
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

let wrapHeight = fieldArea.clientHeight;

function setBetWindowCoords(target) {
	let coords = getCoords(target);
	let top = coords.top + target.clientHeight;
	let left = coords.left + target.clientWidth/2;

	if(prevTarget && prevTarget != target) prevTarget.classList.remove("active");


	if(target == prevTarget) {
		betWindow.classList.toggle("active");
		target.classList.toggle("active");
	}else {		
		betWindow.classList.add("active");
		target.classList.toggle("active");
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

$headline.on('click', function(e){
	// this.nextElementSibling.classList.toggle("show");
	$(this).next().fadeToggle(400);
})

$headline.on('mousedown', function(e){
	return false;
})

$complex.on('click', function(e) {
	let next = this.nextElementSibling
	while(next.className == "complex__item") {
		$(next).fadeToggle(500);

		next = next.nextElementSibling;
		if(next == null) break;
	}
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
	toolTipTimer = setTimeout(()=> removeTableTooltip(), 2000);
});

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

// function TableTooltip(options) {
// 	let elem = ""
// }


accept.onclick = function(e) {
	new Message({text: "Пари зафиксированно"});
}

cancel.onclick = function(e) {
	new Message({text: "Пари сброшено"});
}


