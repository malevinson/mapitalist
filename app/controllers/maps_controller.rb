class MapsController < ApplicationController
  def countries
  	render :file => "#{Rails.root}/tmp/countries.json", 
	  	     :content_type => 'application/json',
	  	     :layout => false
  end

  def update
    geoJSON = Country.buildJSON(params)

  	File.open("#{Rails.root}/tmp/countries.json","w") do |f|
		  f.write(geoJSON)
		end
    
    render json: geoJSON
    puts "Updated countries.json"
  end

 	private
 	
 	def update_params

 	end
end
