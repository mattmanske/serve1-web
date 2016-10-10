class Case < ActiveRecord::Base
  enum court_type: { other: 0, municipal_court: 1, circuit_court: 2, district_court: 3, court_of_appeals: 4, supreme_court: 5, department_of_workforce_development: 6 }

  has_many :jobs

  validates :number,    uniqueness: true, allow_nil: true
  validates :plantiff,  presence: true
  validates :defendant, presence: true
  validates :state_id,  presence: true
  validates :county_id, presence: true

  def state
    State.find(self.state_id)
  end

  def county
    County.find(self.county_id)
  end

  def name
    [self.number, self.title].reject(&:blank?).join(', ')
  end

  def title
    [self.plantiff_name, self.defendant_name].reject(&:blank?).join(' v. ')
  end

  def location
    [self.county.name, self.state.two_digit_code].reject(&:blank?).join(', ')
  end

  def court_name
    self.court_type.titlecase
  end

  def plantiff_name
    [self.plantiff, self.plantiff_et_al ? 'et al' : nil].reject(&:blank?).join(', ')
  end

  def defendant_name
    [self.defendant, self.defendant_et_al ? 'et al' : nil].reject(&:blank?).join(', ')
  end
end
