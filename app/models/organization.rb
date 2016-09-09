class Organization < ActiveRecord::Base
  has_many :users

  validates :name, presence: true
  validates :subdomain, presence: true
  validates :subdomain, uniqueness: { case_sensitive: false }
  validates :subdomain, exclusion: { in: %w(www admin), message: "%{value} is reserved." }

  after_create :create_tenant

  private

  def create_tenant
    Apartment::Tenant.create(subdomain)
  end
end
