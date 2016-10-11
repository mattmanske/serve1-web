class Document < ActiveRecord::Base
  has_many :service_documents
  has_many :services, through: :service_documents

  validates :name, presence: true
end
