class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :name
      t.string :two_digit_code, limit: 2

      t.timestamps null: false
    end
  end
end
