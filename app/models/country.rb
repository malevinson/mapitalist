class Country < ActiveRecord::Base
	def self.buildJSON(params)
    
    feature_collection = {
    	type: "FeatureCollection",
    	features: []
    }

    countries = params[:countries]

    # iterate over every country in params
    countries.each do |k, countryParams|
	    country = Country.find_by(name: countryParams[:name])

	    new_feature = { 
				type: "Feature", 
				properties: 
					{ 
						visible: true,
						volume: countryParams[:volume],
						name: countryParams[:name],
						dailyChange: countryParams[:dailyChange],
						lastTradeDate: countryParams[:lastTradeDate],
						lastTradeTime: countryParams[:lastTradeTime],
						symbol: countryParams[:symbol],
						alpha: countryParams[:alpha],
						color: countryParams[:color],
						fullName: countryParams[:fullName],
						yearHigh: countryParams[:yearHigh],
						yearLow: countryParams[:yearLow],
						dayHigh: countryParams[:dayHigh],
						dayLow: countryParams[:dayLow]
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
