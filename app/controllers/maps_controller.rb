class MapsController < ApplicationController
  @@countries_json_file = "#{Rails.root}/tmp/countries.json"

  def countries
  	render :file => @@countries_json_file, 
	  	     :content_type => 'application/json',
	  	     :layout => false
  end

  def update
    geoJSON = Country.buildJSON(params)

  	File.open(@@countries_json_file,"w") do |f|
		  f.write(geoJSON)
		end
    
    render json: geoJSON
    puts "Updated countries.json"
  end

 	private
 	
 	def update_params

 	end
end
