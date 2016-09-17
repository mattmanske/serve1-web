class OrganizationUser < ActiveRecord::Base
  enum role: { server: 0, manager: 1, admin: 2 }

  validates :user_id, presence: true, uniqueness: true

  before_create :switch_tenant

  def user
    User.find(self.user_id)
  end

  private

  def switch_tenant
    Apartment::Tenant.switch!(self.user.organization.subdomain)
  end
end
