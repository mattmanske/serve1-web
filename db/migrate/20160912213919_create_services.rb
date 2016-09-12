class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.references :job, index: true, foreign_key: true
      t.references :party, index: true, foreign_key: true

      t.integer :status,       null: false, default: 0
      t.integer :service_type, null: false, default: 0

      t.string :person_name,     null: false
      t.string :person_title,    null: false
      t.string :person_capacity, null: false

      t.datetime :service_date
      t.integer :attempts, null: false, default: 1
      t.integer :mileage
      t.monetize :payment
      t.text :notes

      t.timestamps null: false
    end
  end
end
