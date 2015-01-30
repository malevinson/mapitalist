class AddPriceToStocks < ActiveRecord::Migration
  def change
    add_column :stocks, :price, :string
  end
end
