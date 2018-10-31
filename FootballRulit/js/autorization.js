'use strict'

let about = document.querySelector(".authorization__about");
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".close");

about.onmousedown = function(e) {
	event.preventDefault();
}

about.onclick = function(e) {
	modal.style.display = "block";

	document.onclick = function(event) {
		if(event.target.className == "modal" || event.target.className == "close"){
			modal.style.display = "none";
		}
	}
}