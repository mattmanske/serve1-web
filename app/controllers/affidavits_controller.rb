class AffidavitsController < ApplicationController
  before_action :set_affidavit, only: [:show, :edit, :update, :destroy]

  # GET /affidavits
  def index
    @affidavits = Affidavit.all
  end

  # GET /affidavits/1
  def show
  end

  # GET /affidavits/new
  def new
    @affidavit = Affidavit.new
  end

  # GET /affidavits/1/edit
  def edit
  end

  # POST /affidavits
  def create
    @affidavit = Affidavit.new(affidavit_params)

    if @affidavit.save
      redirect_to @affidavit, notice: 'Affidavit was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /affidavits/1
  def update
    if @affidavit.update(affidavit_params)
      redirect_to @affidavit, notice: 'Affidavit was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /affidavits/1
  def destroy
    @affidavit.destroy
    redirect_to affidavits_url, notice: 'Affidavit was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_affidavit
      @affidavit = Affidavit.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def affidavit_params
      params.require(:affidavit).permit(:service_id, :caption_type, :court, :state_id, :url)
    end
end
