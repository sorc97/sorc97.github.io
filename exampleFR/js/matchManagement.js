'use strict'


let changeInfo = $(".manager__changeInfo");
let insertingElem;
let eventsTable = document.querySelector(".management__history_events_content");
let eventsCaptions = document.querySelector(".management__history_captions");
let prevWidth = eventsTable.clientWidth;

function log(message) {
	console.log(message);
}


// function setMatchInfo(options) {
// 	let elem = document.createElement("div");
// 	elem.className = "game__side_information_match";
// 	elem.innerHTML = `<strong>Матч</strong>: ${options.name} <br> <strong>Время</strong>: ${options.time} <strong>Тайм</strong>: ${options.half}
// 	<br> <strong>Счет</strong>: ${options.score}`;

// 	matchInfo.insertBefore(elem, matchInfo.firstElementChild);
// }

changeInfo.on('click', function(e) {
	changeToInput(this);
});

function changeToInput(target) {
	let text = target.textContent;
	insertingElem = target;

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


function insertEventElem() {
	let elem = document.createElement("tr");
	elem.innerHTML = `<td>00:00</td>
				 <td>Угловой на левой половине</td>
				 <td>asdasd</td>`;
	eventsTable.appendChild(elem);
	scrollCheck();
}

function scrollCheck() {
	if(!(prevWidth === eventsTable.clientWidth)) {
		eventsCaptions.classList.remove("caption_uncalculated");
		eventsCaptions.classList.add("caption_calculated");
	}

	prevWidth = eventsTable.clientWidth;
}

// setInterval(()=> insertEventElem(), 1000);


var $sideBut = $(".management__side_button");
var advice = $(".management__side_advice");

// $sideBut.on('click', function() {

// 	if(this.classList.contains("timeFreeze")){
// 		//Код заморозки времени
// 		switchBut(this);
// 	}else{
// 		//Код остановки приема ставок
// 		switchBut(this);
// 	}
// });

//Переключение кнопок
// function switchBut(elem) {
// 	if(elem.classList.contains("disable")) {
// 		$(elem).hide();
// 		$(elem.nextElementSibling).show();
// 	}else{
// 		$(elem).hide();
// 		$(elem.previousElementSibling).show();
// 	}
// }

$sideBut.on('click', function() {
	switchBut(this);
});

function switchBut(elem) {
	if(elem.classList.contains("disable")) {
		let str = elem.innerHTML.split(" ");
		str[0] = "Возобновить";

		elem.innerHTML = str.join(" ");

		elem.classList.remove("disable");
		elem.classList.add("enable");
	}else{
		let str = elem.innerHTML.split(" ");
		str[0] = "Остановить";

		elem.innerHTML = str.join(" ");
		
		elem.classList.add("disable");
		elem.classList.remove("enable");
	}
}

//Показать совета
function showAdvice(){
	advice.fadeIn(700);
	setTimeout(()=> advice.fadeOut(700), 5000);
}

showAdvice();

