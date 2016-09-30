class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :key, null: false

      t.references :case, index: true, foreign_key: true

      t.integer :status, null: false, default: 0

      t.datetime :date_sent
      t.datetime :date_received
      t.text :notes

      t.timestamps null: false
    end

    add_index :jobs, [:key, :case_id], unique: true
    add_monetize :jobs, :amount, amount: { null: true, default: nil }, currency: { present: false }
  end
end
