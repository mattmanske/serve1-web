class CreateServiceDocuments < ActiveRecord::Migration
  def change
    create_table :service_documents do |t|
      t.belongs_to :service, index: true, foreign_key: true
      t.belongs_to :document, index: true, foreign_key: true

      t.integer :type, null: false

      t.timestamps null: false
    end
  end
end
