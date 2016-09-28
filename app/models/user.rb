class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :organization

  validates :first_name, presence: true
  validates :last_name,  presence: true
  validates :email,      presence: true, uniqueness: { scope: :organization_id }

  def tenant
    self.organization.subdomain
  end

  def name
    [self.first_name, self.last_name].reject(&:blank?).join(' ')
  end
end
