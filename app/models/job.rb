class Job < ActiveRecord::Base
  enum status: { received: 0, dispatched: 1, completed: 2, sent: 3, closed: 4 }

  has_many :services

  belongs_to :case
  belongs_to :client
  belongs_to :client_contact

  validates :number,         presence: true
  validates :status,         presence: true
  validates :client,         presence: true
  validates :client_contact, presence: true

  def name
    self.number
  end

  def status_name
    self.status.titlecase
  end

  def date_received
    self.received_at.strftime("%b #{self.received_at.day.ordinalize}, %Y") if self.received_at
  end

  def date_sent
    self.sent_at.strftime("%b #{self.sent_at.day.ordinalize}, %Y") if self.sent_at
  end
end
