var lastPressed = "";

function toggle(item){
	var clicked = document.getElementById(item+'Expansion');
	var lastClicked = "";
	if (lastPressed != "") {
		lastClicked = document.getElementById(lastPressed+'Expansion');
		console.log(lastPressed+'Expansion');
	}
	var content = document.createTextNode(item + "variations");
	
	//our first click
	if (lastClicked == "") { 
		clicked.appendChild(content);
		clicked.style.display = "inline-block"

	//nothing is currently opened
	} else if (lastClicked.style.display == "none") {
		clicked.appendChild(content);
		clicked.style.display = "inline-block";
 
	//something is currently opened
	} else if (lastClicked.style.display == "inline-block") {
		//we reclicked our last click
		if (clicked == lastClicked) {
			lastClicked.style.display = "none";
			lastClicked.innerHTML = "";
 
		//and we clicked something else
		} else if (clicked != lastClicked) {
			lastClicked.style.display = "none";
			lastClicked.innerHTML = "";
			clicked.appendChild(content);
			clicked.style.display = "inline-block";
 
		}
	}
	lastPressed = item;
}

function createExpansion(name) {
	var div = document.createElement('div');
	div.id = name+"Expansion";
	div.style.border = '1px solid black';
	div.style.position= 'relative';
	div.onmouseup = dynamicEvent; //todo: eentuallyt his is the elements of the expansion
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;
}

function dynamicEvent() {
	alert("works");
}

