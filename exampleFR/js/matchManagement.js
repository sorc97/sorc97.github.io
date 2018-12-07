'use strict'

let matchInfo = document.querySelector(".game__side_information_matchWrapper");
let fieldArea = document.querySelector(".game__betField");
let betTable = document.querySelector(".game__betField_table");
let tableTooltip = document.querySelector(".game__betField_tableTooltip");
let bet = document.getElementsByClassName("game__betField_bet");
let $bet = $(".game__betField_bet");
let confirm = $(".management__confirm_wrapper");
let $approveBut = $("#approveBut");
let $cancelEventBut = $("#cancelEventBut");
let $anotherEventBut = $("#anotherEventBut");
let changeInfo = $(".manager__changeInfo");
let $elemsEvent;
let direction, secondDirection, event;
let insertingElem;
function log(message) {
	console.log(message);
}


function setMatchInfo(options) {
	let elem = document.createElement("div");
	elem.className = "game__side_information_match";
	elem.innerHTML = `<strong>Матч</strong>: ${options.name} <br> <strong>Время</strong>: ${options.time} <strong>Тайм</strong>: ${options.half}
	<br> <strong>Счет</strong>: ${options.score}`;

	matchInfo.insertBefore(elem, matchInfo.firstElementChild);
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

betTable.onmousedown = function(event) {return false};

let wrapHeight = fieldArea.clientHeight;

function getToolTip(e) {
	direction = document.getElementById(this.getAttribute("data-direction"));
	secondDirection = document.getElementById(this.getAttribute("data-secondDirection"));
	event = document.getElementById(this.getAttribute("data-event"));

	if(e.type == "mouseenter") {
		if(secondDirection) secondDirection.classList.add("highlight");

		direction.classList.add("highlight");
		event.classList.add("highlight");

		setTableTooltip(this.getAttribute("data-event"), this.getAttribute("data-direction"), this.getAttribute("data-secondDirection"));

	}else{
		if(secondDirection) secondDirection.classList.remove("highlight");

		direction.classList.remove("highlight");
		event.classList.remove("highlight");
		removeTableTooltip();
	}
}

function bindEvents(){
	$(".game__betField_bet").on('mouseenter', getToolTip);
	$(".game__betField_bet").on('mouseleave', getToolTip);
}

function unBindEvents() {
	$(".game__betField_bet").unbind('mouseenter', getToolTip);
	$(".game__betField_bet").unbind('mouseleave', getToolTip);
}

bindEvents();

// let toolTipTimer;

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


function generateEvent(eventData) {
	clearField();
	event = eventData;
	event = eventData.split(" ");

	let eventName = event[0];
	let eventDirection = event[1];
	let eventSecondDirection = event[2];

	$elemsEvent = $(`[data-event = ${eventName}][data-direction = ${eventDirection}]`);
	if(eventSecondDirection){
		$elemsEvent = $(`[data-event = ${eventName}][data-direction = ${eventDirection}][data-secondDirection = ${eventSecondDirection}]`);
	}

	activeEvent($elemsEvent);
	$elemsEvent.trigger("mouseenter");
	$elemsEvent.on("click", ()=> showConfirm());
	unBindEvents();
};

function showConfirm() {
	confirm.addClass("showConf");
}

function hideConfirm() {
	confirm.removeClass("showConf");
}

function activeEvent(cell) {
	cell.toggleClass("activeCell");
}

// generateEvent("out right top");
// setTimeout(() => generateEvent("goal all"), 2000);
setTimeout(() => generateEvent("out right top"), 2000);

$approveBut.on('click', approveEvent);
$cancelEventBut.on('click', cancelEvent);
$anotherEventBut.on('click', anotherEvent);

function clearField() {
	let clear = $("th");
	clear.removeClass("highlight");
}

function unFreeze(){
	clearField();
	$elemsEvent.removeClass("activeCell");
	$elemsEvent.unbind("click");
	hideConfirm();
	bindEvents();
}

function approveEvent(e){
	$elemsEvent.addClass("approveElem");

	hideConfirm();
	setTimeout(()=> {
		$elemsEvent.removeClass("approveElem");
		unFreeze();
	}, 2000);
	$bet.unbind("click");
};

function cancelEvent(e) {
	unFreeze();
	$bet.unbind("click");
}

function anotherEvent(e) {
	cancelEvent();

	$bet.on("click", function(e){
		$elemsEvent = $(this);
		activeEvent($elemsEvent);
		$elemsEvent.trigger("mouseenter");
		showConfirm();
		unBindEvents();
	});
}

changeInfo.on('click', function(e) {
	changeToInput(this);
});

function changeToInput(target) {
	let text = target.textContent;
	insertingElem = target;
	// let input = `<input type="text" value="${text}">`;
	let input = document.createElement("input");
	input.value = text;
	input.type = "text";
	input.style.width = target.offsetWidth + "px";

	target.parentNode.insertBefore(input, target);
	target.remove();
	input.addEventListener("keydown", changeToElement);
}

function changeToElement(event){
	let target = event.target;
	insertingElem.textContent = target.value;
	if(event.keyCode === 13) {
		target.parentNode.insertBefore(insertingElem, target);
		target.remove();
	}
}


// setTimeout(() => generateEvent("out right top"), 10000);