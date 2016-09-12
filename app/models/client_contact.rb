class ClientContact < ActiveRecord::Base
  belongs_to :client, inverse_of: :client_contacts

  validates :name,  presence: true
  validates :email, presence: true
end
