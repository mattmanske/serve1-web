class Organization < ActiveRecord::Base
  belongs_to :state
  belongs_to :county

  has_many :users

  validates :name,      presence: true
  validates :state,     presence: true
  validates :county,    presence: true
  validates :subdomain, presence: true, uniqueness: { case_sensitive: false }, exclusion: { in: %w(www admin), message: "%{value} is reserved." }

  after_create :create_tenant

  private

  def create_tenant
    Apartment::Tenant.create(subdomain)
  end
end
