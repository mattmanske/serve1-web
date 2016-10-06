class CreateAffidavits < ActiveRecord::Migration
  def change
    create_table :affidavits do |t|
      t.references :service, index: true, foreign_key: true

      t.integer :notary_state_id, null: false
      t.integer :notary_county_id, null: false

      t.string :url

      t.timestamps null: false
    end

    add_index :affidavits, :service_id, unique: true
  end
end
