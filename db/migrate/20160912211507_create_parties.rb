class CreateParties < ActiveRecord::Migration
  def change
    create_table :parties do |t|
      t.string :name, null: false
      t.string :address

      t.integer :state_id, null: false
      t.integer :county_id, null: false
      t.integer :municipality_id, null: false

      t.timestamps null: false
    end
  end
end
