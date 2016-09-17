class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :organization

  after_commit :create_organization_user_record, on: :create

  validates :name,  presence: true
  validates :email, presence: true, uniqueness: { scope: :organization_id }

  def tenant
    self.organization.subdomain
  end

  private

  def create_organization_user_record
    OrganizationUser.create(user_id: self.id).admin!
  end
end
