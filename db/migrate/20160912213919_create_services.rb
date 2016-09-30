class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.references :job, index: true, foreign_key: true
      t.references :party, index: true, foreign_key: true

      t.integer :status, null: false, default: 0
      t.integer :service_type

      t.string :person_name
      t.string :person_title
      t.string :person_capacity
      t.string :person_description

      t.datetime :service_date
      t.integer :attempts
      t.integer :mileage
      t.text :notes

      t.timestamps null: false
    end

    add_monetize :services, :payment, amount: { null: true, default: nil }, currency: { present: false }
  end
end
