var secondaryLinkData = "";
var data;
var allLinks = [];

function toggleOn(item){
	
	/*if (previous != ""){
		toggleOff(previous);
	}*/
	for (var i = 0; i < allLinks.length; i++) {
		if (item != allLinks[i]) {
			toggleOff(allLinks[i]);
		}
	}
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
				expansionContainer.appendChild(secondaryLinkDiv);

			}

		}
		
	}
	
//	mainButton.style.fontWeight = "bold";
	expansionContainer.style.display = "inline-block";

}


function toggleOff(item){
	var mainButton = document.getElementById(item + 'Link');
	if (document.getElementById(item+'ExpansionContainer') != null) {
		var expansionContainer = document.getElementById(item+'ExpansionContainer');
			expansionContainer.innerHTML = "";
			expansionContainer.style.display = "none";
	}
	mainButton.style.fontWeight = "normal";


}

function getVariationsandToggleOn(item) {
	//turn json obj into string
	var data = JSON.stringify({'name': item });
	jQuery.post('/get_variations', data, function(data) { return true; })
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
	document.body.appendChild(div);
	return div;
}

function createSecondaryLink(i) {
	var div = document.createElement('div');
	div.id = "SecondaryLink"+i;
	div.className = 'secondaryLinks';
	div.onmouseup = dynamicEvent;
	return div;
}

function dynamicEvent() {
	var data = JSON.stringify({'name': this.id});
	jQuery.post('/click_variation', data, function(data) { return true; })
		.done(function(data, textStatus, jqXHR) {
		});
}
