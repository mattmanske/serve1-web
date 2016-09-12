class Case < ActiveRecord::Base
  enum court_type: { circuit: 0, district: 1 }

  has_many :jobs, inverse_of: :cases, dependent: :destroy

  belongs_to :client
  belongs_to :client_contact
  belongs_to :state
  belongs_to :county

  validates :plantiff,   presence: true
  validates :defendant,  presence: true
  validates :court_type, presence: true
  validates :key,        presence: true, uniqueness: { case_sensitive: false }
end
