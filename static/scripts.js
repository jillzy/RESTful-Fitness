var lastPressed = "";
var secondaryLinkText = "default";

function toggleOn(item){
	document.getElementById(item + 'Link')
		.appendChild(createExpansion(item));	
	
	var mainButton = document.getElementById(item + 'Link');
	var clicked = document.getElementById(item+'Expansion');
	var content = document.createTextNode(secondaryLinkText);
	
	mainButton.style.fontWeight = "bold";
	clicked.innerHTML = "";
	clicked.appendChild(content);
	clicked.style.display = "inline-block";
	
	lastPressed = item;
}


function toggleOff(item){

	var mainButton = document.getElementById(item + 'Link');
	var clicked = document.getElementById(item+'Expansion');
	
	mainButton.style.fontWeight = "normal";
	clicked.style.display = "none";
	clicked.innerHTML = "";

}






function createExpansion(name) {
	var div = document.createElement('div');
	div.id = name+"Expansion";
	div.className = 'secondaryLinks';
	div.onmouseup = dynamicEvent; //todo: eentuallyt his is the elements of the expansion
	document.body.appendChild(div);
	return div;
}

function dynamicEvent() {
	alert("works");
}

function handleData(data) {
	//var div = document.createElement('div');
	//append as a child in expansion
	console.log(data);
	secondaryLinkText = data;
}