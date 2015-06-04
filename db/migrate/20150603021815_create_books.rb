class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.float :Call_num
      t.string :Title
      t.string :Subtitle
      t.string :Author_first
      t.string :Author_last
      t.integer :Copyright
      t.text :Subject
      t.text :Annotation

      t.timestamps null: false
    end
  end
end
