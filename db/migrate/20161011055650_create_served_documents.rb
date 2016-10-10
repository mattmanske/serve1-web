class CreateServedDocuments < ActiveRecord::Migration
  def change
    create_table :served_documents do |t|
      t.belongs_to :service, index: true, foreign_key: true
      t.belongs_to :document, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
