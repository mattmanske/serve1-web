class ServedDocument < ActiveRecord::Base
  belongs_to :service
  belongs_to :document
end
