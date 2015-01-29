class StocksController < ApplicationController
  def index
  	if user_signed_in? && params[:user_id].to_i == current_user.id
	  	current_user.stocks
	  	render json: current_user.stocks
	  else
	  	render json: {error: "invalid request"}
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
  	params.require(:stock).permit(:symbol)
  end
end
