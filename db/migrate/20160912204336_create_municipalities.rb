class CreateMunicipalities < ActiveRecord::Migration
  def change
    create_table :municipalities do |t|
      t.references :county, index: true, foreign_key: true
      t.string :name
      t.string :category

      t.timestamps null: false
    end

    add_index :municipalities, [:name, :county_id, :category], unique: true
  end
end
