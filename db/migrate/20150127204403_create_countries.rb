class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.text :coordinates

      t.timestamps null: false
    end
  end
end
