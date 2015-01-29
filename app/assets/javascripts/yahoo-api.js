function updateGeoJSONData() {

	// javascript object mapping symbols to their countries
	var lookup = {
		"VTI"  : "United States",
		"EWA"  : "Australia",
		"EWC"  : "Canada",
		"EWD"  : "Sweden",
		"EWG"  : "Germany",
		"EWH"  : "Hong Kong",
		"EWI"  : "Italy",
		"EWJ"  : "Japan",
		"EWK"  : "Belgium",
		"EWL"  : "Switzerland",
		"EWM"  : "Malaysia",
		"EWN"  : "Netherlands",
		"EWO"  : "Austria",
		"EWP"  : "Spain",
		"EWQ"  : "France",
		"EWS"  : "Singapore",
		"EWU"  : "United Kingdom",
		"EWW"  : "Mexico",
		"EWT"  : "Taiwan",
		"EWY"  : "South Korea",
		"EWZ"  : "Brazil",
		"EZA"  : "South Africa",
		"PLND" : "Poland",
		"EIDO" : "Indonesia",
		"ENZL" : "New Zealand",
		"COLX" : "Columbia",
		"EDEN" : "Denmark",
		"EGPT" : "Egypt",
		"EFNL" : "Finland",
		"GREK" : "Greece",
		"INDA" : "India",
		"EIRL" : "Ireland",
		"EIS"  : "Israel",
		"NORW" : "Norway",
		"EPU"  : "Peru",
		"EPHE" : "Philippines",
		"RSX"  : "Russia",
		"THD"  : "Thailand",
		"TUR"  : "Turkey",
		"VNM"  : "Vietnam",
		"MCHI" : "China",
		"ARGT" : "Argentina",
		"ECH"  : "Chile",
		"COLX" : "Columbia",
		"EFNL" : "Finland"
	};

	var keys = Object.keys(lookup);
	var formattedKeys = '"' + keys.join('","') + '"';

	var query = 'select * from yahoo.finance.quotes where symbol in (' +
		formattedKeys + 
		')&format=json&diagnostics=true&env=http://datatables.org/alltables.env&callback=';

	var encodedQuery = encodeURI(query);

	var encodedURI = 'https://query.yahooapis.com/v1/public/yql?q=' + encodedQuery;

	// call to Yahoo API requesting stock information for lookup list
	$.ajax(
		{url: encodedURI,
		success: function(response){
			console.log("Fetched new price data from Yahoo", response);

			var countries = transformResponse(response);
			
			if (countries != false) {
				$.ajax({
				 url: "maps/update",
				 type: "POST",
				 data: {countries: countries},
				 success: function(){
				 	updateMapData();
				 	console.log("Updated server with latest price data", countries);
				 }
				});
			} else {
				console.log("Skipping Post", "(Bad response from Yahoo)");
			}

		 },
		error: function(){
		console.log("Error fetching price data from Yahoo"); 
		}
	});

	function transformResponse(response){
		var results = response.query.results.quote;

		var min = Number.POSITIVE_INFINITY;
		var max = Number.NEGATIVE_INFINITY;

		var countries = [];
			
		// iterates through each of the stock objects received from the ajax call
		_.each(results, function(result){
			var ask = result.Ask;
			var countryName = lookup[result.Symbol];
			var bid = result.Bid;
			var price = ((parseInt(ask) + parseInt(bid))/2).toString();
			var open = result.Open;
			var dailyChange = (parseFloat(price) / parseFloat(open)).toString();

			if ( isNaN(ask) || isNaN(bid) || isNaN(price) || isNaN(open) || isNaN(dailyChange) ) {
				// Bad response from Yahoo or the markets aren't open 
				// (skip this country)
				return false
			}

			// uncomment for demo mode
			// dailyChange = randomIntFromInterval(80,120);

			min = dailyChange < min ? dailyChange : min;
			max = dailyChange > max ? dailyChange : max;

			var country = {
				visible: true,
				volume: result.Volume,
				name: countryName,
				dailyChange: dailyChange,
				lastTradeDate: result.LastTradeDate,
				lastTradeTime: result.LastTradeTime,
				symbol: result.Symbol,
				fullName: result.Name,
				yearHigh: result.YearHigh,
				yearLow: result.YearLow,
				dayHigh: result.DaysHigh,
				dayLow: result.DaysLow,
				lastPrice: price
			};
			
			countries.push(country);
		});
			
		var b = 1, a = 0;

		_.each(countries, function(country){
			var dailyChange = parseFloat(country.dailyChange);
			var alpha = ((b - a) * dailyChange - min)/(max - min) + a;
			country.alpha = alpha.toString();
			country.color = numToColorGradient(dailyChange, alpha);
		});

		return countries;
	}
}

updateGeoJSONData();

var intervalID = window.setInterval(updateGeoJSONData, 10000);