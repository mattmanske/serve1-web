class Client < ActiveRecord::Base
  has_many :client_contacts, inverse_of: :client, dependent: :destroy

  validates :name,  presence: true
  validates :email, presence: true
  validates :key,   presence: true, uniqueness: { case_sensitive: false }
end
