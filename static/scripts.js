var secondaryLinkData = "";
var data;

function toggleOn(item){
	
	var mainButton = document.getElementById(item + 'Link');
	
	if (secondaryLinkData != "") {
		document.getElementById(item + 'Link')
			.appendChild(createExpansionContainer(item));
		
		var expansionContainer = document.getElementById(item+'ExpansionContainer');
		var dict = JSON.parse(secondaryLinkData);
		
		for (var key in dict){
			for (var i = 0; i < dict[key].length; i++) {
				var secondaryLinkDiv = createSecondaryLink(i);
				var content = document.createTextNode(dict[key][i]);
				secondaryLinkDiv.appendChild(content);
				console.log("append '" + content.textContent + "' to "
					+ secondaryLinkDiv.id);

				expansionContainer.appendChild(secondaryLinkDiv);
				console.log("append " + secondaryLinkDiv.id + " to "
					+ expansionContainer.id);
			}

		}
		
	}
	
	mainButton.style.fontWeight = "bold";
	expansionContainer.style.display = "inline-block";

}


function toggleOff(item){

	var mainButton = document.getElementById(item + 'Link');
	if (document.getElementById(item+'ExpansionContainer') != null) {
		var expansionContainer = document.getElementById(item+'ExpansionContainer');
			expansionContainer.style.display = "none";
			expansionContainer.innerHTML = "";
	}
	mainButton.style.fontWeight = "normal";


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
}

function createExpansionContainer(name) {
	var div = document.createElement('div');
	div.id = name+"ExpansionContainer";
	div.className = 'expansionContainer';
	//div.onmouseup = dynamicEvent; //todo: eentuallyt his is the elements of the expansion
	document.body.appendChild(div);
	return div;
}

function createSecondaryLink(i) {
	var div = document.createElement('div');
	div.id = "SecondaryLink"+i;
	div.className = 'secondaryLinks';
	div.onmouseup = dynamicEvent;
	//document.body.appendChild(div);
	return div;
}

function dynamicEvent() {
	alert("works");
}
