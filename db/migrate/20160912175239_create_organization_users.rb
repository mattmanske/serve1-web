class CreateOrganizationUsers < ActiveRecord::Migration
  def change
    create_table :organization_users do |t|
      t.integer :user_id
      t.integer :role, default: 0, null: false

      t.timestamps null: false
    end
  end
end
