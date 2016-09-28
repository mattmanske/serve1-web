class CreateClientContacts < ActiveRecord::Migration
  def change
    create_table :client_contacts do |t|
      t.references :client, index: true, foreign_key: true
      t.string :first_name, null: false, default: ''
      t.string :last_name,  null: false, default: ''
      t.string :email,      null: false
      t.string :address
      t.string :phone

      t.timestamps null: false
    end
  end
end
