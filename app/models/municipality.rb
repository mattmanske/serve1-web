class Municipality < ActiveRecord::Base
  belongs_to :county

  validates :county,   presence: true
  validates :category, presence: true
  validates :name,     presence: true, uniqueness: { case_sensitive: false, scope: [:county_id, :category] }

  scope :county_id, -> county { where(:county => county) }

  def title
    [self.category, self.name].reject(&:blank?).join(' of ')
  end
end
