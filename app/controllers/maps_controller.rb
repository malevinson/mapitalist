class MapsController < ApplicationController
  def countries
  	render :file => "#{Rails.root}/public/assets/javascripts/countries.json", 
	  	     :content_type => 'application/json',
	  	     :layout => false
  end

  def update
  	# Receive params of data to update our countries.json
    
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
					{ name: v[:name], visible: true }, 
				geometry: 
					{ type: country.poly_type, coordinates: eval(country.coordinates) }
			}

    	feature_collection[:features] << new_feature
    end

    geoJSON = feature_collection.to_json

    puts "Updating countries.json"
  	File.open("#{Rails.root}/public/assets/javascripts/countries.json","w") do |f|
		  f.write(geoJSON)
		end

    # puts feature_collection[:features].to_json

    render json: geoJSON
  end

 	private
 	
 	def update_params

 	end
end
