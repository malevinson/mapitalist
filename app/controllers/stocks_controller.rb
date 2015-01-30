class StocksController < ApplicationController
  def index
  	if user_signed_in?
  		@watched_stocks = current_user.stocks
      respond_to do |format|
        format.html { render :index, layout: false}
        format.json { render :json => @watched_stocks }
  		end
	  else
	  	render text: "Sign in to track stocks in real time"
	  end
  end

  def create
  	new_stock = current_user.stocks.find_or_initialize_by(symbol: params[:stock][:symbol])
    new_stock.price = params[:stock][:price]
  	if new_stock.save
  		render json: current_user.stocks
  	end
  end

  def destroy
  	new_stock = current_user.stocks.new(params)
  	if new_stock.destroy
  		render json: current_user.stocks
  	end
  end

  def stock_params
  	params.require(:stock).permit(:symbol, :price)
  end
end
