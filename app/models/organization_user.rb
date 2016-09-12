class OrganizationUser < ActiveRecord::Base
  enum role: { server: 0, admin: 1 }

  validates :user_id, presence: true
  validates :user_id, uniqueness: true

  before_create :switch_tenant

  def user
    User.find(user_id)
  end

  private

  def switch_tenant
    Apartment::Tenant.switch!(user.organization.subdomain)
  end
end
