class StocksController < ApplicationController
  def index
  	if user_signed_in?
  		@watched_stocks = current_user.stocks
  		render :index, layout: false
	  else
	  	render text: "Sign in to track stocks in real time"
	  end
  end

  def create
  	new_stock = current_user.stocks.new(stock_params)
  	if new_stock.save
  		render json: current_user.stocks
  	end
  end

  def destroy
  	new_stock = current_user.stocks.new(stock_params)
  	if new_stock.destroy
  		render json: current_user.stocks
  	end
  end

  def stock_params
  	params.require(:data).permit(:symbol)
  end
end
