class Service < ActiveRecord::Base
  enum status: { dispatched: 0, in_progress: 1, blocked: 2, served: 3 }
  enum service_type: { personal: 0, substitute: 1, corporate: 2, governmental: 3, attempted: 4 }

  belongs_to :job
  belongs_to :party

  has_many :affidavits
  has_many :documents
  has_many :attachments

  def name
    self.key
  end

  def date_served
    self.service_date.strftime("%b #{self.service_date.day.ordinalize}, %y") if self.service_date
  end
end
