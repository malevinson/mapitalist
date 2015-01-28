// Accepts a float between -1 and 1
// and a dailyChange value (neg or pos)
// returns a color from red to green
function numToColorGradient(dailyChange, num){
	// lighter to darker
	var reds = ['#FFBFBF', '#FF8080', '#FF4040', '#FF0000', '#BF0000'];
	var greens = ['#8FBF8F', '#60BF60', '#30BF30', '#00BF00', '#008000'];

	var color;

	if (dailyChange < 1) {
		// red
		var i = reds.length - 1 - Math.round(Math.abs(num) * (reds.length - 1));
		color = reds[i];
	} else {
		// green
		var i = Math.round(num * (greens.length - 1));
		color = greens[i];
	}

	return color
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}