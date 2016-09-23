class Case < ActiveRecord::Base
  enum court_type: { municipal_court: 0, circuit_court: 1, district_court: 2, court_of_appeals: 3, supreme_court: 4, department_of_workforce_development: 5 }

  has_many :jobs, inverse_of: :cases, dependent: :destroy

  belongs_to :client
  belongs_to :client_contact
  belongs_to :state
  belongs_to :county

  validates :plantiff,  presence: true
  validates :defendant, presence: true
  validates :key,       presence: true, uniqueness: { case_sensitive: false }
end
