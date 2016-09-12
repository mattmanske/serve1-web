class CreateParties < ActiveRecord::Migration
  def change
    create_table :parties do |t|
      t.string :name, null: false
      t.string :address

      t.references :state, index: true, foreign_key: true
      t.references :county, index: true, foreign_key: true
      t.references :municipality, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
