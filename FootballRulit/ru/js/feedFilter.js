'use strict'

var filter = document.querySelector(".ff__filter");

function FilterEvent(options){
	let elem = document.createElement("div");
	elem.className = "ff__filter_filterEvent";
	elem.innerHTML = `<span>${options.event}</span> <span>${options.time}</span> <button class="ff__filter_filterEvent_accept">Accept</button>`

	filter.appendChild(elem);
}


FilterEvent({event: "AUT", time: "12:34"});
FilterEvent({event: "AUT", time: "12:34"});
FilterEvent({event: "AUT", time: "12:34"});
FilterEvent({event: "AUT", time: "12:34"});
FilterEvent({event: "AUT", time: "12:36"});
FilterEvent({event: "AUT", time: "12:35"});
FilterEvent({event: "AUT", time: "12:32"});
// FilterEvent({event: "AUT", time: "12:34"});
// FilterEvent({event: "AUT", time: "12:34"});
// FilterEvent({event: "AUT", time: "12:34"});
// FilterEvent({event: "AUT", time: "12:34"});
// FilterEvent({event: "AUT", time: "12:34"});
// FilterEvent({event: "AUT", time: "12:34"});
// FilterEvent({event: "AUT", time: "12:34"});

var accept = $(".ff__filter_filterEvent_accept");
accept.on('click', function(){
	this.parentNode.remove();
});
