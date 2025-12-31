class CreateBellRings < ActiveRecord::Migration[7.2]
  def change
    create_table :bell_rings do |t|
      t.timestamps
    end
  end
end
