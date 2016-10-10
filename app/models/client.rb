class Client < ActiveRecord::Base
  has_many :client_contacts, inverse_of: :client, dependent: :destroy

  validates :key,   presence: true, uniqueness: { case_sensitive: false }
  validates :name,  presence: true
  validates :email, presence: true
end
