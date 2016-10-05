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

  def service_count
    Service.where(party_id: self.id).count
  end

  def location
    [self.municipality.name, self.county.name, self.state.two_digit_code].reject(&:blank?).join(', ')
  end
end
