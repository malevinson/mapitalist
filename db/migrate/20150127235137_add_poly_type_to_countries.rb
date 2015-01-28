class AddPolyTypeToCountries < ActiveRecord::Migration
  def change
    add_column :countries, :poly_type, :string
  end
end
