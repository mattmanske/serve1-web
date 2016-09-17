class Affidavit < ActiveRecord::Base
  belongs_to :service
  belongs_to :state

  validates :name, presence: true
end
