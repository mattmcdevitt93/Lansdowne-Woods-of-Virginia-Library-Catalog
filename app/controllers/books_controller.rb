class BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]

  def contact
  end

  def login
  end

  # GET /books
  # GET /books.json
  def index
  Rails.logger.info "Current Page Index?: " + request.path.to_s
      @books = Book.all.order(:Author_last)
  end

  def search
    Rails.logger.info "search:" + params[:search]
    Rails.logger.info "params: '" + params[:params] + "'"
    if params[:search].to_s == ''
      Rails.logger.info "Redirect Root"

    end
    if params[:search] == nil
      redirect_to root_path
    elsif params[:search] == "Title"
      @search = Book.search_by_title("%" + params[:params] + "%")

    elsif params[:search] == "Call_num"
      @search = Book.search_by_call_number("%" + params[:params] + "%")

    elsif params[:search] == "Subject"
      @search = Book.search_by_subject("%" + params[:params] + "%")

    elsif params[:search] == "Author"
      @search = Book.search_by_full_name("%" + params[:params] + "%")

    elsif params[:search] == "Copyright"
      @search = Book.search_by_year("%" + params[:params] + "%")
    end
      


  end

  # GET /books/1
  # GET /books/1.json
  def show
  end

  # GET /books/new
  def new
    @book = Book.new
  end

  # GET /books/1/edit
  def edit
  end

  # POST /books
  # POST /books.json
  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        format.html { redirect_to @book, notice: 'Book was successfully created.' }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /books/1
  # PATCH/PUT /books/1.json
  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to :back, notice: 'Book was successfully updated.' }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url, notice: 'Book was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params.require(:book).permit(:Call_num, :Title, :Subtitle, :Author_first, :Author_last, :Copyright, :Subject, :Annotation, :status)
    end
end
