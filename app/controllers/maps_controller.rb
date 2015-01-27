class MapsController < ApplicationController
  def countries
  	render :file => "#{Rails.root}/public/assets/javascripts/countries.json", 
  	      :content_type => 'application/json',
  	      :layout => false
  end

  def update
  	json = params.to_json
  	puts json
    render :nothing => true
  end

 	private
 	
 	def update_params

 	end
end
