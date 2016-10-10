class Attempt < ActiveRecord::Base
  belongs_to :service

  validates :service,      presence: true
  validates :user_id,      presence: true
  validates :address,      presence: true
  validates :attempted_at, presence: true

  def user
    User.find(self.user_id)
  end

  def server_name
    self.user.name
  end

  def date_attempted
    self.attempted_at.strftime("%b #{self.attempted_at.day.ordinalize}, %Y") if self.attempted_at
  end

  def time_attempted
    self.attempted_at.strftime("%I:%M%p") if self.attempted_at
  end
end
