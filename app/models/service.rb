class Service < ActiveRecord::Base
  enum status: { dispatched: 0, in_progress: 1, blocked: 2, served: 3 }
  enum service_type: { personal: 0, substitute: 1, corporate: 2, governmental: 3, attempted: 4 }

  belongs_to :job
  belongs_to :party

  has_one :affidavit
  has_many :attempts
  has_many :service_documents
  has_many :documents, through: :service_documents

  def status_name
    self.status.titlecase
  end

  def service_type_name
    self.service_type.titlecase if self.service_type
  end

  def service_date
    self.attempts.last().attempted_at
  end

  def date_served
    self.service_date.strftime("%b #{self.service_date.day.ordinalize}, %Y") if self.service_date
  end

  def time_served
    self.service_date.strftime("%I:%M%p") if self.service_date
  end

  def attempts_count
    self.attempts.size
  end

  def mileage
    self.attempts.sum(:milage)
  end
end
