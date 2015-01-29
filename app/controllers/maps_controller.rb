class MapsController < ApplicationController
  
  def countries
    country_ids = Country.where(visible: true).pluck(:id)
    @geoJSON = Country.buildJSON(country_ids)
  	render json: @geoJSON
  end

  def update
    country_ids = []

    params["countries"].values.each do |k, v|
      country = Country.find_or_create_by(name: k["name"])
        country.visible = k["visible"]
        country.volume = k["volume"]
        country.daily_change = k["dailyChange"]
        country.last_trade_date = k["lastTradeDate"]
        country.last_trade_time = k["lastTradeTime"]
        country.symbol = k["symbol"]
        country.alpha = k["alpha"]
        country.color = k["color"]
        country.fund_name_full = k["fullName"]
        country.year_high = k["yearHigh"]
        country.year_low = k["yearLow"]
        country.day_high = k["dayHigh"]
        country.day_low = k["dayLow"]
        country.last_price = k["lastPrice"]

      if country.save
        country_ids << country.id
      end
    end

    geoJSON = Country.buildJSON(country_ids)

    render json: geoJSON
    puts "Updated countries.json"
  end

 	private
 	
 	def update_params

 	end
end
