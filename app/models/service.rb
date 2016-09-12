class Service < ActiveRecord::Base
  enum status: { active: 0, closed: 1 }
  enum service_type: { in_person: 0, by_proxy: 1 }

  belongs_to :job
  has_one :party
  has_many :affidavits
  has_many :documents
  has_many :attachments

  validates :person_name,     presence: true
  validates :person_title,    presence: true
  validates :person_capacity, presence: true
end
