class ClientContact < ActiveRecord::Base
  belongs_to :client, inverse_of: :client_contacts

  validates :first_name, presence: true
  validates :last_name,  presence: true
  validates :email,      presence: true

  scope :client_id, -> client { where(:client => client) }

  def name
    [self.first_name, self.last_name].reject(&:blank?).join(" ")
  end
end
