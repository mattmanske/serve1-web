class ServiceDocument < ActiveRecord::Base
  enum type: { authenticated: 0, copy: 1, alias: 2, original: 3 }

  belongs_to :service
  belongs_to :document
end
