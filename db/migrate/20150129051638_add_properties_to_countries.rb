class AddPropertiesToCountries < ActiveRecord::Migration
  def change
    add_column :countries, :visible, :boolean, default: false
    add_column :countries, :volume, :string, default: ""
    add_column :countries, :daily_change, :float, default: 0
    add_column :countries, :last_trade_date, :string, default: ""
    add_column :countries, :last_trade_time, :string, default: ""
    add_column :countries, :symbol, :string, default: ""
    add_column :countries, :alpha, :string, default: ""
    add_column :countries, :color, :string, default: ""
    add_column :countries, :fund_name_full, :string, default: ""
    add_column :countries, :year_high, :string, default: ""
    add_column :countries, :year_low, :string, default: ""
    add_column :countries, :day_high, :string, default: ""
    add_column :countries, :day_low, :string, default: ""
    add_column :countries, :last_price, :string, default: ""
    add_column :countries, :change_in_percent, :string, default: ""
  end
end
