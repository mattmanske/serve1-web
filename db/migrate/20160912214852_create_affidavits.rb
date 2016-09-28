class CreateAffidavits < ActiveRecord::Migration
  def change
    create_table :affidavits do |t|
      t.references :service, index: true, foreign_key: true

      t.integer :state_id, null: false

      t.string :court, null: false
      t.string :url

      t.timestamps null: false
    end
  end
end
