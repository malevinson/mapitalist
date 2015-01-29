class Stock < ActiveRecord::Base
	belongs_to :user

	validates_presence_of :symbol
	validates_uniqueness_of :symbol, scope: :user_id
end
