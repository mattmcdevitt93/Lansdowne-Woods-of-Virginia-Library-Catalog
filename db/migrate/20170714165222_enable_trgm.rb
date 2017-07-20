class EnableTrgm < ActiveRecord::Migration
  def change
    	enable_extension "plpgsql"
  	    enable_extension "pg_trgm"
    	add_column :books, :status, :boolean
  end
end
