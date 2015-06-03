class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.integer :Call_num
      t.text :Title
      t.text :Subtitle
      t.text :Author_first
      t.text :Author_last
      t.date :Copyright
      t.text :Subject
      t.text :Annotation

      t.timestamps null: false
    end
  end
end
