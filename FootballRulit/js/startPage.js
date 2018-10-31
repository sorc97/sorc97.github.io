let matchesWrapper = $(".startPage__matches_wrapper");

let showingMenu = document.querySelector(".startPage__showingMenu_wrapper");
let personalArea = document.querySelector("#personalArea");
let menuStatus = false;
let $menuItems = $(".startPage__header_menu_item");
let $about = $(".about");
let $rules = $(".rules");
console.log($about);

personalArea.onclick = function(event) {
	if(!menuStatus) {
		showingMenu.classList.add("show");
		menuStatus = true;
		return;
	}

	showingMenu.classList.remove("show");
	menuStatus = false;
}

$menuItems[0].onclick = function(e) {
	$about.show();
	$("body").addClass("fixed");

	document.onclick = function(event) {
		if(event.target.className == $(".modal") || event.target.className == "close"){
			$about.hide();
			$("body").removeClass("fixed");
		}
	}
}

$menuItems[1].onclick = function(e) {
	$rules.show();
	$("body").addClass("fixed");

	document.onclick = function(event) {
		if(event.target.className == $(".modal") || event.target.className == "close"){
			$rules.hide();
			$("body").removeClass("fixed");
		}
	}
}

function Match(options) {

}