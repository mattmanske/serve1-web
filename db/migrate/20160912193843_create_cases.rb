class CreateCases < ActiveRecord::Migration
  def change
    create_table :cases do |t|
      t.string :number

      t.integer :state_id, null: false
      t.integer :county_id, null: false
      t.integer :court_type, null: false

      t.string :plantiff, null: false
      t.boolean :plantiff_et_al, null: false, default: false

      t.string :defendant, null: false
      t.boolean :defendant_et_al, null: false, default: false

      t.timestamps null: false
    end

    add_index :cases, :number, unique: true
  end
end
