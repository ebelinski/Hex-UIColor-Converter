$(document).ready(function() {
	// On page load, check if URL has a hash
	if(window.location.hash) {
		processHash();
	}

	// On page load, focus on hex value input
	$("input#hex-value").focus();

	// On hex value input change, process its value
	$("#hex-value").keyup(function() {
		processValue();
	});

	$("#toggle-tips").click(function () {
		$("#tips").toggle();
	});
});

$(window).on('hashchange', function() {
	processHash();
});

function processHash() {
	var hash = window.location.hash.substring(1);
	$("#hex-value").val("#"+hash);
	processValue();
}

function processValue() {
	var rawValue = $("#hex-value").val();
	var newValue = "";
	// console.log("Value: " + rawValue);
	
	if (((rawValue.length == 7 || rawValue.length == 4) && rawValue[0] == '#') || ((rawValue.length == 6 || rawValue.length == 3) && rawValue[0] != '#')) {
		if (rawValue[0] == '#') {
			// console.log("7/4 and #");
			newValue = rawValue.substring(1);
		} else {
			// console.log("6/3");
			newValue = rawValue;
		}

		newValue = newValue.toLowerCase();

		if (newValue.length == 3) {
			newValue = newValue[0]+newValue[0]+newValue[1]+newValue[1]+newValue[2]+newValue[2];
		}

		var red = getColorValue(newValue[0]+newValue[1]);
		var grn = getColorValue(newValue[2]+newValue[3]);
		var blu = getColorValue(newValue[4]+newValue[5]);

		if (isNaN(red) || isNaN(grn) || isNaN(blu)) {
			$("#swift-results").html("");
			$("#objective-c-results").html("");
		} else {
			$("#swift-results").html("<pre class='code'>UIColor(red: "+red+", green: "+grn+", blue: "+blu+", alpha: 1) /* #"+newValue+" */</pre>");
			$("#objective-c-results").html("<pre class='code'>[UIColor colorWithRed:"+red+" green:"+grn+" blue:"+blu+" alpha:1]; /* #"+newValue+" */</pre>");
		}
	} else {
		$("#swift-results").html("");
		$("#objective-c-results").html("");
	}
}

function getColorValue(hex) {
	newValue = parseInt(hex, 16);
	newValue = newValue / 255;
	newValue = Math.round(newValue * 1000) / 1000;

	return newValue;
}