class Affidavit < ActiveRecord::Base
  enum caption_type: { standard_civil: 0, federal: 1, notice_of_claim: 2, workers_comp: 3, divorce: 4 }

  belongs_to :service
  belongs_to :state

  validates :name, presence: true
end
