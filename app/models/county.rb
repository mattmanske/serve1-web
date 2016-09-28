class County < ActiveRecord::Base
  belongs_to :state, inverse_of: :counties

  validates :state, presence: true
  validates :name,  presence: true, uniqueness: { case_sensitive: false, scope: :state_id }

  scope :state, -> state { where(:state => state) }
end
