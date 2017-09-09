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
		expansionContainer.innerHTML = "";
		var dict = JSON.parse(secondaryLinkData);
		
		for (var key in dict){
			for (var i = 0; i < dict[key].length; i++) {
				var secondaryLinkDiv = createSecondaryLink(dict[key][i]);
				var content = document.createTextNode(dict[key][i]);
				secondaryLinkDiv.appendChild(content);
				expansionContainer.appendChild(secondaryLinkDiv);

			}

		}
		
	}
	
//	mainButton.style.fontWeight = "bold";
	expansionContainer.style.display = /*inline-*/"block";

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

function createSecondaryLink(name) {
	var div = document.createElement('div');
	div.id = name; //the secondary links are just named whatever their text is
	div.className = 'secondaryLinks';
	div.onmouseup = clickSecondaryLink;
	return div;
}

function clickSecondaryLink() {
	//todo: clear elements from other links
	var contentDiv = document.getElementById('content');
	contentDiv.innerHTML = "";
	var data = JSON.stringify({'name': this.id});
	var url = "";
	jQuery.post('/click_variation', data, function(data) { return true; })
		.done(function(data, textStatus, jqXHR) {
			console.log(data);
			var dict = JSON.parse(data);
			for (var key in dict){
				for (var i = 0; i < dict[key].length; i++) {
					console.log(dict[key][i]);
					url = "https://www.youtube.com/embed/" + dict[key][i];
					var div = document.createElement("iframe");
					div.style.width = '450px';
					div.style.margin = '0px 10px';
					div.setAttribute("src", url);
					div.className = "player";
					contentDiv.appendChild(div);
				}
			}
			//var url = "https://www.youtube.com/embed/" + data;
			//div.setAttribute('src', url);
		});
}


function parseStr(str) {
	//		console.log(str = str.replace(/[^a-zA-Z]/g, ''));
	str = str.replace(/\s+/g, '+');
	str = str.replace(/[^0-9a-zA-Z+]/g, "");
	str = str.substring(1);
	str = str.split("+u");
	console.log(str);
	for (var i = 0; i < n.length; i++ ) {
			console.log(i+ ": " + n[i] + w[i]);
	}
	return str;
}