class CreateCounties < ActiveRecord::Migration
  def change
    create_table :counties do |t|
      t.string :name
      t.references :state, index: true, foreign_key: true

      t.timestamps null: false
    end

    add_index :counties, [:name, :state_id], unique: true
  end
end
