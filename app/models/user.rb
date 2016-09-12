class User < ActiveRecord::Base
  belongs_to :organization
  accepts_nested_attributes_for :organization

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :name,  presence: true
  validates :email, presence: true, uniqueness: { scope: :organization_id }

  after_create :create_organization_user_record

  private

  def create_organization_user_record
    OrganizationUser.create(user_id: id).admin!
  end
end
