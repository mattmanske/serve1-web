class Job < ActiveRecord::Base
  enum status: { received: 0, dispatched: 1, completed: 2, sent: 3, closed: 4 }

  belongs_to :case
  has_many :services

  validates :status, presence: true
  validates :key,    presence: true, uniqueness: { case_sensitive: false, scope: :case_id }
end
