class Attachment < ActiveRecord::Base
  belongs_to :service

  validates :url, presence: true
end
