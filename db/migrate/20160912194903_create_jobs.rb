class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :number, null: false

      t.references :case, index: true, foreign_key: true
      t.references :client, index: true, foreign_key: true
      t.references :client_contact, index: true, foreign_key: true

      t.integer :status, null: false, default: 0

      t.datetime :received_at
      t.datetime :sent_at
      t.text :notes

      t.timestamps null: false
    end

    add_index :jobs, :number, unique: true
    add_monetize :jobs, :amount, amount: { null: true, default: nil }, currency: { present: false }
  end
end
