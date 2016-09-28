class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :name, null: false
      t.string :subdomain, null: false

      t.string :address
      t.string :phone
      t.string :email

      t.references :state, index: true, foreign_key: true
      t.references :county, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
