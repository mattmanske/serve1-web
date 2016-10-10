class CreateAffidavits < ActiveRecord::Migration
  def change
    create_table :affidavits do |t|
      t.references :service, index: true, foreign_key: true, unique: true

      t.integer :notary_state_id, null: false
      t.integer :notary_county_id, null: false

      t.text :header

      t.timestamps null: false
    end
  end
end
