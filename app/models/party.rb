class Party < ActiveRecord::Base
  belongs_to :state
  belongs_to :county
  belongs_to :municipality

  validates :name, presence: true
end
