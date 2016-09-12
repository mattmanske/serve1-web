class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :key,     null: false
      t.string :name,    null: false
      t.string :email,   null: false
      t.string :address
      t.string :phone

      t.timestamps null: false
    end

    add_index :clients, :key, unique: true
  end
end
