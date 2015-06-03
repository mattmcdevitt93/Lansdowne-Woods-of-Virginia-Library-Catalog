json.array!(@books) do |book|
  json.extract! book, :id, :Call_num, :Title, :Subtitle, :Author_first, :Author_last, :Copyright, :Subject, :Annotation
  json.url book_url(book, format: :json)
end
