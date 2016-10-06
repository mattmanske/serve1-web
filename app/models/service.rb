class Service < ActiveRecord::Base
  enum status: { dispatched: 0, in_progress: 1, blocked: 2, served: 3 }
  enum service_type: { personal: 0, substitute: 1, corporate: 2, governmental: 3, attempted: 4 }

  belongs_to :job
  belongs_to :party

  has_one :affidavit

  has_many :documents
  has_many :attachments

  def status_name
    self.status.titlecase
  end

  def service_type_name
    self.service_type.titlecase if self.service_type
  end

  def date_served
    self.service_date.strftime("%b #{self.service_date.day.ordinalize}, %Y") if self.service_date
  end
end
