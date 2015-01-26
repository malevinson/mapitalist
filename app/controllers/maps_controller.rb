class MapsController < ApplicationController
  def countries
  	render :file => "#{Rails.root}/public/assets/javascripts/countries.json", 
  	      :content_type => 'application/json',
  	      :layout => false
  end
end
