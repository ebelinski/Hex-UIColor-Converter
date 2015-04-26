$(document).ready(function() {
	$("#hex-value").focus();

	$("#hex-value").keyup(function() {
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
				$("#swift-results").html("UIColor(red: "+red+", green: "+grn+", blue: "+blu+", alpha: 1) /* #"+newValue+" */");
				$("#objective-c-results").html("[UIColor colorWithRed:"+red+" green:"+grn+" blue:"+blu+" alpha:1]; /* #"+newValue+" */");
			}
		} else {
			$("#swift-results").html("");
			$("#objective-c-results").html("");
		}
	});
});

function getColorValue(hex) {
	newValue = parseInt(hex, 16);
	newValue = newValue / 255;
	newValue = Math.round(newValue * 1000) / 1000;

	return newValue;
}