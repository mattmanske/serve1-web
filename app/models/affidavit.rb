class Affidavit < ActiveRecord::Base
  belongs_to :service

  validates :name,     presence: true
  validates :state_id, presence: true

  def state
    State.find(self.state_id)
  end
end
