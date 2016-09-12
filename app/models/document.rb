class Document < ActiveRecord::Base
  enum document_types: { authentic: 0, original: 1, copy: 2, alias: 3 }

  belongs_to :service

  validates :name, presence: true
end
