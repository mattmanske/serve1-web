class CreateCases < ActiveRecord::Migration
  def change
    create_table :cases do |t|
      t.string :key, null: false

      t.references :client, index: true, foreign_key: true
      t.references :client_contact, index: true, foreign_key: true
      t.references :state, index: true, foreign_key: true
      t.references :county, index: true, foreign_key: true

      t.integer :court_type, default: nil

      t.string :plantiff, null: false
      t.boolean :plantiff_et_al, null: false, default: false

      t.string :defendant, null: false
      t.boolean :defendant_et_al, null: false, default: false

      t.timestamps null: false
    end

    add_index :cases, :key, unique: true
  end
end
