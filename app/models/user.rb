class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :organization
  accepts_nested_attributes_for :organization

  validates :email, presence: true
  validates :email, uniqueness: { scope: :organization_id }
end
