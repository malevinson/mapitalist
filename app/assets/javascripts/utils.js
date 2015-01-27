// Accepts a float between -1 and 1
// and returns a color from red to green
function numToColorGradient(num){
	var reds = ['#FFBFBF', '#FF8080', '#FF4040', '#FF0000', '#BF0000'];
	var greens = ['#8FBF8F', '#60BF60', '#30BF30', '#00BF00', '#008000'];

	var color;

	if (num < 0) {
		var i = Math.round(num * -1 * (reds.length - 1));
		color = reds[i];
	} else if (num > 0) {
		var i = Math.round(num * (greens.length - 1));
		color = greens[i];
	} else {
		color = '#FFFFFF';
	}
	return color
}