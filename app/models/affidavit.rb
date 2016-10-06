class Affidavit < ActiveRecord::Base
  belongs_to :service

  validates :notary_state_id,  presence: true
  validates :notary_county_id, presence: true

  scope :service_id, -> service { where(:service => service) }

  def notary_state
    State.find(self.notary_state_id).name
  end

  def notary_county
    County.find(self.notary_county_id).name
  end
end
