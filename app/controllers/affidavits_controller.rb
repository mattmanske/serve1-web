class AffidavitsController < ApplicationController
  before_action :set_affidavit, only: [:show, :edit, :update, :destroy]

  respond_to :json, only: [:index, :show, :new, :create]
  respond_to :pdf, only: [:show]

  # GET /affidavits
  def index
    @affidavits = Affidavit.all
  end

  # GET /affidavits/1
  def show
    respond_to do |format|
      format.json { render :json => props }
      format.pdf  { render pdf: 'affidavit', layout: 'pdf.html', show_as_html: params[:debug].present? }
    end
  end

  # GET /affidavits/new
  def new
    @service = Service.find(params[:service_id])

    @affidavit = Affidavit.new({
      service_id:       @service.id,
      notary_state_id:  default_state,
      notary_county_id: default_county
    })

    form_repsonse(form_props)
  end

  # GET /affidavits/1/edit
  def edit
    form_repsonse(form_props)
  end

  # POST /affidavits
  def create
    @affidavit = Affidavit.new(affidavit_params)

    if @affidavit.save
      render json: { resource: @affidavit, redirect: affidavit_path(@affidavit) }
    else
      render json: { affidavit: @affidavit.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /affidavits/1
  def update
    if @affidavit.update(affidavit_params)
      render json: { resource: @affidavit, redirect: affidavit_path(@affidavit) }
    else
      render json: { affidavit: @affidavit.errors }, status: :unprocessable_entity
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
      params.require(:affidavit).permit(:service_id, :notary_state_id, :notary_county_id)
    end

    # Setup form
    def form_props
      states   = select_format State.all.order(:name)
      counties = select_format County.where(state: @affidavit.notary_state_id).order(:name)

      {
        :resource      => @affidavit,
        :resource_type => 'affidavits',
        :action        => polymorphic_path([@service, @affidavit]),
        :selections => {
          :states   => states,
          :counties => counties
        },
        :selection_urls => {
          :counties => counties_path
        },
      }
    end
end
