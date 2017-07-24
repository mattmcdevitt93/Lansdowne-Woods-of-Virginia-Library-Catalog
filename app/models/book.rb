class Book < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_full_name, :against => [:Author_last, :Author_first], :using => [:tsearch, :trigram]
  pg_search_scope :search_by_year, :against => [:Copyright], :using => [:tsearch, :trigram]
  pg_search_scope :search_by_call_number, :against => [:Call_num], :using => [:tsearch, :trigram]
  pg_search_scope :search_by_title, :against => [:Title], :using => [:tsearch, :trigram]
  pg_search_scope :search_by_subject, :against => [:Title, :Subtitle, :Subject, :Annotation], :using => [:tsearch, :trigram]
end
