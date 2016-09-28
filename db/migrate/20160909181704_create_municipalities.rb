class CreateMunicipalities < ActiveRecord::Migration
  def change
    create_table :municipalities do |t|
      t.string :name
      t.string :category
      
      t.references :county, index: true, foreign_key: true

      t.timestamps null: false
    end

    add_index :municipalities, [:name, :county_id, :category], unique: true
  end
end
