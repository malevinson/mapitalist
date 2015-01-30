class AllCountriesController < ApplicationController
  def index
  	@countries = Country.where(visible: true).order(name: :asc)
  	render :index, layout: false
  end

  def show
  	@properties = params[:properties]

  	render :show, layout: false

  end
end
