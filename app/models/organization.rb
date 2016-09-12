class Organization < ActiveRecord::Base
  belongs_to :state
  belongs_to :county

  has_many :users

  validates :name,      presence: true
  validates :subdomain, presence: true
  validates :subdomain, uniqueness: { case_sensitive: false }
  validates :subdomain, exclusion: { in: %w(www admin), message: "%{value} is reserved." }
  validates :state,     presence: true
  validates :county,    presence: true

  after_create :create_tenant

  private

  def create_tenant
    Apartment::Tenant.create(subdomain)
  end
end
