'use strict'


let changeInfo = $(".manager__changeInfo");
let insertingElem;

function log(message) {
	console.log(message);
}


		event.classList.remove("highlight");
		removeTableTooltip();
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
