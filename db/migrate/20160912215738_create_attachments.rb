class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.references :service, index: true, foreign_key: true
      t.string :url, null: false

      t.timestamps null: false
    end
  end
end
