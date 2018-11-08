let showingMenu = document.querySelector(".startPage__showingMenu_wrapper");
let personalArea = document.querySelector("#personalArea");
let $menuItems = $(".startPage__header_menu_item");
let $about = $(".about");
let $rules = $(".rules");
let $schedule = $(".schedule");
let header = document.querySelector(".startPage__header");


//Всплавающее меню
personalArea.onmousedown = function(event){
	event.preventDefault();
};


personalArea.onclick = function(event) {
	showingMenu.classList.toggle("show");
};

//МОДАЛЬНЫЕ ОКНА
$menuItems[0].onclick = function(e) {
	$about.show();
	$("body").addClass("fixed");

	document.onclick = function(event) {
		if(event.target.className == $(".modal") || event.target.className == "close"){
			$about.hide();
			$("body").removeClass("fixed");
		}
	}
};

$menuItems[1].onclick = function(e) {
	$rules.show();
	$("body").addClass("fixed");

	document.onclick = function(event) {
		if(event.target.className == $(".modal") || event.target.className == "close"){
			$rules.hide();
			$("body").removeClass("fixed");
		}
	}
};

$menuItems[2].onclick = function(e) {
	$schedule.show();
	$("body").addClass("fixed");
	console.log("hi")

	document.onclick = function(event) {
		if(event.target.className == $(".modal") || event.target.className == "close"){
			$schedule.hide();
			$("body").removeClass("fixed");
		}
	}
}



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

function Schedule(options) {
	let elem = document.createElement("tr");
	elem.className = "schedule__table_string";
	elem.innerHTML = `<tr>
						<td>${options.name}</td>
						<td>${options.start}</td>
						<td>${options.state}</td>
						<td>${options.score}</td>
					</tr>`;

	if(options.active) {
		elem.classList.add("active");
		elem.addEventListener("click", function() {
			alert("Переход в раздел игры");
		});
	}
	scheduleTable.appendChild(elem);
}

$('.startPage__matches_item.active').on("click", function(e) {
    document.location = this.dataset.url
});
