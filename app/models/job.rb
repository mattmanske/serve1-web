class Job < ActiveRecord::Base
  enum statue: { active: 0, closed: 1 }

  belongs_to :case

  validates :status, presence: true
  validates :key,    presence: true, uniqueness: { case_sensitive: false, scope: :case_id }
end
