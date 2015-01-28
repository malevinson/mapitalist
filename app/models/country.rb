class Country < ActiveRecord::Base
	def self.buildJSON(params)
    
    feature_collection = {
    	type: "FeatureCollection",
    	features: []
    }

    countries = params[:countries]

    # iterate over every country in params
    countries.each do |k, v|
	    country = Country.find_by(name: v[:name])

	    new_feature = { 
				type: "Feature", 
				properties: 
					{ 
						visible: true,
						volume: v[:volume],
						name: v[:name],
						dailyChange: v[:dailyChange],
						lastTradeDate: v[:lastTradeDate],
						lastTradeTime: v[:lastTradeTime],
						symbol: v[:symbol],
						alpha: v[:alpha],
						color: v[:color]
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
