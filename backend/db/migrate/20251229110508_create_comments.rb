class CreateComments < ActiveRecord::Migration[7.2]
  def change
    create_table :comments do |t|
      t.string :body, null: false
      t.timestamps
    end
  end
end
