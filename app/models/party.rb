class Party < ActiveRecord::Base

  validates :name,            presence: true
  validates :state_id,        presence: true
  validates :county_id,       presence: true
  validates :municipality_id, presence: true

  def state
    State.find(self.state_id)
  end

  def county
    County.find(self.county_id)
  end

  def municipality
    Municipality.find(self.municipality_id)
  end
end
