class Municipality < ActiveRecord::Base
  belongs_to :county

  validates :county,   presence: true
  validates :category, presence: true
  validates :name,     presence: true, uniqueness: { case_sensitive: false, scope: [:county_id, :category] }
end
