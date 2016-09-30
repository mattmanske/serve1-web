class CasesController < ApplicationController
  before_action :set_case, only: [:show, :edit, :update, :destroy]

  respond_to :json, only: [:index, :edit, :new, :create]

  # GET /cases
  def index
    @cases = Case.all.order(:key)

    respond_to do |format|
      format.html
      format.json { render :json => select_format(@cases) }
    end
  end

  # GET /cases/1
  def show
  end

  # GET /cases/new
  def new
    @case = Case.new({ state_id: default_state })
    form_repsonse(form_props)
  end

  # GET /cases/1/edit
  def edit
    form_repsonse(form_props)
  end

  # POST /cases
  def create
    @case = Case.new(case_params)

    if @case.save
      render json: { resource: @case, redirect: cases_path() }
    else
      render json: { case: @case.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cases/1
  def update
    if @case.update(case_params)
      render json: { resource: @case, redirect: cases_path() }
    else
      render json: { case: @case.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /cases/1
  def destroy
    @case.destroy
    redirect_to cases_url, notice: 'Case was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_case
      @case = Case.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def case_params
      params.require(:case).permit(:key, :client_id, :client_contact_id, :state_id, :county_id, :court_type, :plantiff, :plantiff_et_al, :defendant, :defendant_et_al)
    end

    # Setup form
    def form_props
      clients     = select_format Client.all().order(:name)
      contacts    = select_format ClientContact.where(client: @case.client_id).to_a.sort_by(&:name)
      states      = select_format State.all.order(:name)
      counties    = select_format County.where(state: @case.state_id).order(:name)
      court_types = select_format Case.court_types.keys, :to_s, :titlecase

      {
        :resource      => @case,
        :resource_type => 'cases',
        :action        => polymorphic_path(@case),
        :selections => {
          :clients     => clients,
          :contacts    => contacts,
          :states      => states,
          :counties    => counties,
          :court_types => court_types
        },
        :selection_urls => {
          :clients  => clients_path,
          :contacts => client_contacts_path,
          :counties => counties_path
        },
        :modal_urls => {
          :clients  => new_client_path,
          :contacts => new_client_contact_path
        }
      }
    end
end
