  // javascript object mapping symbols to their countries
var lookup = {
"VTI": "United States",
"EWA": "Australia",
"EWC": "Canada",
"EWD": "Sweden",
"EWG": "Germany",
"EWH": "Hong Kong",
"EWI": "Italy",
"EWJ": "Japan",
"EWK": "Belguim",
"EWL": "Switzerland",
"EWM": "Malaysia",
"EWN": "Netherlands",
"EWO": "Austria",
"EWP": "Spain",
"EWQ": "France",
"EWS": "Singapore",
"EWU": "United Kindgom",
"EWW": "Mexico",
"EWT": "Taiwan",
"EWY": "South Korea",
"EWZ": "Brazil",
"EZA": "South Africa",
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
"EIS" : "Isreal",
"NORW" : "Norway",
"EPU" : "Peru",
"EPHE" : "Philippines",
"RSX" : "Russia",
"THD" : "Thailand",
"TUR" : "Turkey",
"VNM" : "Vietnam"
};


var countryNameAndPerformance = {};

var query = 'select * from yahoo.finance.quotes where symbol in ("VTI","EWA","EWC","EWD","EWG","EWH","EWI","EWJ","EWK","EWL","EWM","EWN","EWO","EWP","EWQ","EWS","EWU","EWW","EWT","EWY","EWZ","EZA")&format=json&diagnostics=true&env=http://datatables.org/alltables.env&callback=';

var encodedQuery = encodeURI(query);

var encodedURI = 'https://query.yahooapis.com/v1/public/yql?q=' + encodedQuery;


  // call to Yahoo API requesting stock information for 22 hard coded symbols
  $.ajax(
    {url: encodedURI,
    success: function(response){

      var results = response.query.results.quote;

      var min = Number.POSITIVE_INFINITY;
      var max = Number.NEGATIVE_INFINITY;

      var countries = [];
        
            // for loop that appends a row of data for each country to the table
            // iterates through each of the stock objects received from the ajax call
           for (var i = 0; i < results.length; i++ ){

              var ask = results[i].Ask;
              var countryName = lookup[results[i].Symbol];
              var symbol = results[i].Symbol;
              var bid = results[i].Bid;
              var price = ((parseInt(ask) + parseInt(bid))/2).toString();
              var open = results[i].Open;
              var dailyChange = (parseFloat(price) / parseFloat(open)).toString();
              var volume = results[i].Volume;

              min = dailyChange < min ? dailyChange : min;
              max = dailyChange > max ? dailyChange : max;

              var country = {};
              country["visible"] = true;
              country["symbol"] = symbol;
              country["name"] = countryName;
              country["dailyChange"] = dailyChange;

              countries.push(country);
          }
          

          var b = 1, a = -1;
          countryAlphas = {};

          _.each(countries, function(country){
            var alpha = ((b - a) * (parseFloat(country.dailyChange) - min))/(max - min) + a;
            var alphaString = alpha.toString();
            country["alpha"] = alphaString;
          });

          console.log(countries);
         

         $.ajax({
          url: "maps/update",
          type: "POST",
          data: countryAlphas
         })
     },
    error: function(){
    console.log("error"); 
    }

       });

// needs As a FE developer, I need a javascript function that takes a country name as a parameter and returns a json object with its performance (raw and scaled) and all the stock symbols that make up its score.

