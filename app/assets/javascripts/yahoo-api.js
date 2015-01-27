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


var countriesDailyChange = {};
var countryNameAndPerformance = {};


  // call to Yahoo API requesting stock information for 22 hard coded symbols
  $.ajax(
    {url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22VTI%22%2C%22EWA%22%2C%22EWC%22%2C%22EWD%22%2C%22EWG%22%2C%22EWH%22%2C%22EWI%22%2C%22EWJ%22%2C%22EWK%22%2C%22EWL%22%2C%22EWM%22%2C%22EWN%22%2C%22EWO%22%2C%22EWP%22%2C%22EWQ%22%2C%22EWS%22%2C%22EWU%22%2C%22EWW%22%2C%22EWT%22%2C%22EWY%22%2C%22EWZ%22%2C%22EZA%22)%0A%09%09&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=",
    success: function(response){

      // stock objects 
      var results = response.query.results.quote;
        
            // for loop that appends a row of data for each country to the table
            // iterates through each of the stock objects received from the ajax call
           for (var i = 0; i < results.length; i++ ){

              var ask = results[i].Ask;
              var country = lookup[results[i].Symbol];
              var symbol = results[i].Symbol;
              var bid = results[i].Bid;
              var price = ((parseInt(ask) + parseInt(bid))/2).toString();
              var open = results[i].Open;
              var dailyChange = (parseFloat(price) / parseFloat(open)).toString();
              var volume = results[i].Volume;

              // adds each symbol : change pair to the countriesDailyChange object
              countriesDailyChange[symbol] = dailyChange;

              // adds country name : performance info pair to the countryNameAndPerformance object
              countryNameAndPerformance[country] = dailyChange;

              var trOpen = $("<tr>");
              var countryCol = $("<td></td>").html(country);
              var askCol = $("<td></td>").html(ask);
              var bidCol = $("<td></td>").html(bid);
              var priceCol = $("<td></td>").html(price);
              var openCol = $("<td></td>").html(open);
              var dailyChangeCol = $("<td></td>").html(dailyChange);
              var volumeCol = $("<td></td>").html(volume);
              var trClose = $("</tr>");

              $("table tbody").append(trOpen, countryCol, askCol, bidCol, priceCol, openCol, dailyChangeCol, volumeCol, trClose);
            }

          // gets the max and min Daily Change values
          // var lowest = _.min(obj, function(o){return o.symbol;});
          var min = _.min(countriesDailyChange, function(o){return o;});
          var max = _.max(countriesDailyChange, function(o){return o;});

          var b = 1, a = -1;
          countryAlphas = {};

          // scale the values
          // output a hash of {SYM: scaled_change (from 1 to -1)}
          for (var j in countriesDailyChange){
            if (countriesDailyChange.hasOwnProperty(j)){  
                  var alpha = ((b - a) * (parseFloat(countriesDailyChange[j]) - min))/(max - min) + a;
                  var alphaString = alpha.toString();
                  countryAlphas[j] = alphaString;
                }
              } 
              console.log(countryAlphas);
         },

    error: function(){
    console.log("error"); 
    }

       });

// needs As a FE developer, I need a javascript function that takes a country name as a parameter and returns a json object with its performance (raw and scaled) and all the stock symbols that make up its score.

