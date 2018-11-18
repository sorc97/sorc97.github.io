let $modal = $(".modal");
let $menuItem = $(".startPage__header_menu_item");
let id;
let showingMenu = document.querySelector(".startPage__showingMenu_wrapper");
let registrBut = document.querySelector(".users__registrBut");
let $usersModal = $(".users");
let $registration = $(".registration");
let registrBack = document.querySelector(".registration__back");
let $removeUser = $(".users__list_remove");
let $inputs = $(".registration__data_item_data");
let matches = document.querySelector(".startPage__matches_wrapper");

// МОДАЛЬНОЕ ОКНО

$("a").on('click', function(e) {
	if(e.target.hasAttribute("data-modal")) {
		id = "." + e.target.getAttribute("data-modal");
	
		toggleModal(id);
	}
});

function toggleModal(id) {
	$(id).show();
	$("body").addClass("fixed");

	document.addEventListener("click", checkEvent);
}

function checkEvent(event) {
	if(event.target.classList.contains("modal")  || event.target.className == "close") {
		$(id).hide();
		$("body").removeClass("fixed");
		document.removeEventListener("click", checkEvent);

		if(id == ".registration") clearData();
	}
};

// ЛИЧНЫЙ КАБИНЕТ

personalArea.onclick = function(event) {
	showingMenu.classList.toggle("show");
}

personalArea.onmousedown = function(event) {return false};

// ОКНО ПОЛЬЗОВАТЕЛЕЙ

registrBut.onclick = function(e) {
	$usersModal.hide();

	id = "." + e.target.getAttribute("data-modal");
	toggleModal(id);
}

//ОКНО РЕГИСТРАЦИИ
// ОЧИСТКА ДАННЫХ ФОРМЫ

function clearData() {
	$inputs.each(function() {
		this.value = "";
	});
}

//ВОЗВРАЩЕНИЕ К ОКНУ ПОЛЬЗОВАТЕЛЕЙ
registrBack.onclick = function(e) {
	$registration.hide();
	id = ".users";
	toggleModal(id);
	clearData();
}
/*
УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ИЗ СПИСКА
*/
$removeUser.on('click', function(e) {
	let target = e.target;
	let parent = this.parentNode;
	parent.remove();
});





function Match(options) {
	let elem = document.createElement("div");
	elem.className = "startPage__matches_item";
	// let html = options.template({
	// 	text: options.text,
	// 	name: options.name,
	// 	start: options.start,
	// 	state: options.state,
	// 	score: options.score,
	// 	firstCoeff: options.firstCoeff,
	// 	secondCoeff: options.secondCoeff
	// });
	// elem.innerHTML = html;

	elem.innerHTML = `<p class="startPage__matches_item_name">${options.name}</p>
					<span class="startPage__matches_item_start">${options.start}</span>
					<span class="startPage__matches_item_state">${options.state}</span>
					<div class="startPage__matches_item_score">${options.score}</div>
					<table class="startPage__matches_item_coeffTable">
						<caption>Победитель</caption>
						<tr>
							<td>1</td>
							<td>X</td>
							<td>2</td>
						</tr>

						<tr>
							<td class="startPage__matches_item_coeff">${options.firstCoeff}</td>
							<td class="startPage__matches_item_coeff">3.7</td>
							<td class="startPage__matches_item_coeff">${options.secondCoeff}</td>
						</tr>
					</table>
					`

	if(options.active){
		elem.classList.add("active");
		elem.addEventListener("click", function() {
			alert("Переход в раздел игры");
		});
	}

	matches.appendChild(elem);
};


new Match({
	name: "CSKA - SPARTAK",
	start: "21:00",
	state: "active",
	score: "0 : 0",
	firstCoeff: 1.24,
	secondCoeff: 3.23,
	active: true
});
new Match({
	name: "CSKA - SPARTAK",
	start: "21:00",
	state: "wait",
	score: "0 : 0",
	firstCoeff: 1.24,
	secondCoeff: 3.23,
	active: false
});
new Match({
	name: "CSKA - SPARTAK",
	start: "21:00",
	state: "wait",
	score: "0 : 0",
	firstCoeff: 1.24,
	secondCoeff: 3.23,
	active: false
});
new Match({
	name: "CSKA - SPARTAK",
	start: "21:00",
	state: "wait",
	score: "0 : 0",
	firstCoeff: 1.24,
	secondCoeff: 3.23,
	active: false
});
new Match({
	name: "CSKA - SPARTAK",
	start: "21:00",
	state: "wait",
	score: "0 : 0",
	firstCoeff: 1.24,
	secondCoeff: 3.23,
	active: false
});
new Match({
	name: "CSKA - SPARTAK",
	start: "21:00",
	state: "wait",
	score: "0 : 0",
	firstCoeff: 1.24,
	secondCoeff: 3.23,
	active: false
});
new Match({
	name: "CSKA - SPARTAK",
	start: "21:00",
	state: "active",
	score: "0 : 0",
	firstCoeff: 1.24,
	secondCoeff: 3.23,
	active: true
});
new Match({
	name: "CSKA - SPARTAK",
	start: "21:00",
	state: "wait",
	score: "0 : 0",
	firstCoeff: 1.24,
	secondCoeff: 3.23,
	active: false
});
new Match({
	name: "CSKA - SPARTAK",
	start: "21:00",
	state: "wait",
	score: "0 : 0",
	firstCoeff: 1.24,
	secondCoeff: 3.23,
	active: false
});