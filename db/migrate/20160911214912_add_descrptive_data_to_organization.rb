class AddDescrptiveDataToOrganization < ActiveRecord::Migration
  def change
    add_column :organizations, :address, :string
    add_column :organizations, :phone, :string
    add_column :organizations, :email, :string

    add_reference :organizations, :state, index: true, foreign_key: true
    add_reference :organizations, :county, index: true, foreign_key: true
  end
end
