class Country < ActiveRecord::Base
	def self.buildJSON(country_ids)
    
    feature_collection = {
    	type: "FeatureCollection",
    	features: []
    }

    countries = Country.find(country_ids)

    # iterate over each country to build the geojson features
    countries.each do |country|

	    new_feature = { 
				type: "Feature", 
				properties: 
					{ 
						visible: true,
						volume: country.volume,
						name: country.name,
						dailyChange: country.daily_change,
						lastTradeDate: country.last_trade_date,
						lastTradeTime: country.last_trade_time,
						symbol: country.symbol,
						alpha: country.alpha,
						color: country.color,
						fullName: country.fund_name_full,
						yearHigh: country.year_high,
						yearLow: country.year_low,
						dayHigh: country.day_high,
						dayLow: country.day_low,
						price: country.last_price
					}, 
				geometry: 
					{ type: country.poly_type, coordinates: eval(country.coordinates) }
			}

    	feature_collection[:features] << new_feature
    end

    geoJSON = feature_collection.to_json

		return geoJSON

	end
end