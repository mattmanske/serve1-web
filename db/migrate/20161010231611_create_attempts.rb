class CreateAttempts < ActiveRecord::Migration
  def change
    create_table :attempts do |t|
      t.references :service, index: true, foreign_key: true
      t.integer :user_id, null: false

      t.string :address, null: false
      t.datetime :attempted_at, null: false

      t.boolean :successful, null: false, default: false

      t.integer :mileage
      t.text :notes

      t.timestamps null: false
    end

    add_monetize :attempts, :payment, amount: { null: true, default: nil }, currency: { present: false }
  end
end
