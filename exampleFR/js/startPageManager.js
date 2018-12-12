let $modal = $(".modal");
let $menuItem = $(".startPage__header_menu_item");
let id;
let showingMenu = document.querySelector(".startPage__showingMenu_wrapper");
let matches = document.querySelector(".startPage__matches_wrapper");
let bcButt = document.querySelector(".create__badConstruct_show");
let bcTable = document.querySelector("#create__schedule");
let bcItem = $("#create__schedule .schedule__table_string");
let createForm = document.querySelector(".create__form_wrapper");

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
		clearFormData();
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

//АККОРДИОН В СОЗДАНИИ МАТЧА

bcButt.onclick = function(event) {
	bcTable.classList.toggle("show");
}

//КЛИК НА МАТЧ BC

bcItem.on('click', function(event) {
	let target = event.target;

	while(!(target.tagName == "TR")){
		target = target.parentNode;
	}
	// console.log(target);
	setDataFromBC(target);
	console.log(getDataFromBC(target));
});

function getDataFromBC(target) {
	let date = target.querySelector("#bc__date");
	let time = target.querySelector("#bc__time");
	let name = target.querySelector("#bc__name");
	let id = target.querySelector("#bc__id");

	return {
		date: date.innerHTML,
		time: time.innerHTML,
		name: name.innerHTML,
		id: id.innerHTML
	}
}

function setDataFromBC(target) {
	let date = createForm.querySelector("#date");
	let time = createForm.querySelector("#time");
	let name = createForm.querySelector("#name");
	let id = createForm.querySelector("#id"); 

	let bcData = getDataFromBC(target);

	date.value = dataFormat(bcData.date);
	time.value = bcData.time;
	name.value = bcData.name;
	id.value = +bcData.id;
	// console.log(dataFormat(bcData.date));
}

function dataFormat(date) {
	return date.split(".").reverse().join("-");
}

function clearFormData() {
	createForm.querySelector("#date").value = "";
	createForm.querySelector("#time").value = "";
	createForm.querySelector("#name").value = "";
	createForm.querySelector("#id").value = ""; 
}

//СОЗДАНИЕ КАРТОЧКИ МАТЧА

function Match(options) {
	let elem = document.createElement("div");
	elem.className = "startPage__matches_item";

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