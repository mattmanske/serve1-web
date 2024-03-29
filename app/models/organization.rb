class Organization < ActiveRecord::Base
  belongs_to :state
  belongs_to :county

  has_many :users

  validates :name,      presence: true
  validates :state,     presence: true
  validates :county,    presence: true
  validates :subdomain, presence: true, uniqueness: { case_sensitive: false }, exclusion: { in: Rails.application.secrets.excluded_subdomains, message: "%{value} is reserved." }

  after_create :create_tenant

  def location
    [self.county.name, self.state.two_digit_code].reject(&:blank?).join(', ')
  end

private

  def create_tenant
    Apartment::Tenant.create(self.subdomain)
  end
end
