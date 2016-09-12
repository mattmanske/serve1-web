class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.references :service, index: true, foreign_key: true
      t.integer :document_type, null: false, default: 0

      t.string :title, null: false

      t.timestamps null: false
    end
  end
end
