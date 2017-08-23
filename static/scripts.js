var lastPressed = "";
var secondaryLinkData = "";
var data;

function toggleOn(item){
	
	console.log("secondaryLinkData is: " + secondaryLinkData);
	
	if (secondaryLinkData != "") {
		document.getElementById(item + 'Link')
			.appendChild(createExpansion(item));
	}
	
	var mainButton = document.getElementById(item + 'Link');
	var clicked = document.getElementById(item+'Expansion');
	var content = document.createTextNode(secondaryLinkData);
	
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

function getVariationsandToggleOn(item) {
	var data = JSON.stringify({'name': item });
	jQuery.post('/action_page', data, function(data) { return true; })
		.done(function(data, textStatus, jqXHR) {
			handleData(data);
			toggleOn(item);
		});
}


function handleData(data) {
	//var div = document.createElement('div');
	//append as a child in expansion
	secondaryLinkData = data;
	console.log("set secondaryLinkData to: " + secondaryLinkData);
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
