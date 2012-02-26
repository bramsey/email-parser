$(document).ready(function() {
	$input_box = $("#input");
	$output_box = $("#output");
	
	
	// Check for email addresses on every key press so the output box updates in real time.
	$input_box.keyup(function(event) {
		var k = event.which
		val = $input_box.attr("value")
		list = makeEmailList(val);
		$output_box.val(list);
		
		if(list != "") {
			$output_box.fadeIn('fast');
		} else {
			$output_box.fadeOut('fast');
		}
	});
	
	// Select the text of the output box when it is clicked, for easy copying.
	$output_box.live('click', function(event) {
		$(this)
			.focus()
			.select();
	});
	
});

function makeEmailList(text) {
	/* Get each word from the text, split by spaces, end line, semicolon, quotes, commas, colons, parens,
	   and brackets. 
	*/
	var words = text.split(/[\s\n;"',;:()<>[\]\\]+/);
	var emails = [];
	
	// Regex for identifying an email address.
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	// For each of the words, add to the array of emails if the word matches the email regex.
	for(key in words){
		if(words[key].match(re)) emails.push(words[key].toLowerCase());
	}
	
	// Remove duplicate entries from the emails array.
	var distinct_emails = removeDuplicateElement(emails);
	
	// Join the emails into a formatted list.
	return distinct_emails.join("; ");
}

function removeDuplicateElement(arrayName) {
	var newArray = new Array();
	
	/* Compare each email to every other email and push an email onto the new array if 
	   a duplicate wasn't found.
	*/
	label:for(var i=0; i<arrayName.length; i++) {  
		for(var j=0; j < newArray.length; j++) {
			if(newArray[j] == arrayName[i]) 
			continue label;
		}
		newArray[newArray.length] = arrayName[i];
	}
	return newArray;
}
	
