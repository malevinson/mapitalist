// Accepts a float between -infinity and infinity
// returns a color from red to green
function numToColorGradient(dailyChangeFloat){
	// lighter to darker
	var reds = ['#FFBFBF', '#FF8080', '#FF4040', '#FF0000', '#BF0000'];
	var greens = ['#8FBF8F', '#60BF60', '#30BF30', '#00BF00', '#008000'];

	colorArray = dailyChangeFloat < 1 ? reds : greens;

	var change = Math.abs(dailyChangeFloat);

	if (change > 10) {
		return colorArray[4]
	}	else if ( change > 5 ) {
		return colorArray[3]
	} else if (change > 3 ) {
		return colorArray[2]
	} else if (change > 1 ) {
		return colorArray[1]
	} else {
		return colorArray[0]
	}

}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}