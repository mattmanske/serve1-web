class Case < ActiveRecord::Base
  enum court_type: { municipal_court: 0, circuit_court: 1, district_court: 2, court_of_appeals: 3, supreme_court: 4, department_of_workforce_development: 5 }

  has_many :jobs, inverse_of: :cases, dependent: :destroy

  belongs_to :client
  belongs_to :client_contact

  validates :key,       presence: true, uniqueness: { case_sensitive: false }
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
    [self.key, self.title].reject(&:blank?).join(', ')
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
