class Affidavit < ActiveRecord::Base
  belongs_to :service

  validates :notary_state_id,  presence: true
  validates :notary_county_id, presence: true

  def notary_state
    State.find(self.notary_state_id)
  end

  def notary_county
    County.find(self.notary_county_id)
  end
end
