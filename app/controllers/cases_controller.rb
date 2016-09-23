class CasesController < ApplicationController
  before_action :set_case, only: [:show, :edit, :update, :destroy]

  respond_to :json, only: [:index, :new, :create]

  # GET /cases
  def index
    @cases = Case.all

    respond_to do |format|
      format.html
      format.json { render :json => @cases }
    end
  end

  # GET /cases/1
  def show
  end

  # GET /cases/new
  def new
    @case = Case.new

    clients     = select_format Client.all().order(:name)
    contacts    = select_format ClientContact.all().order(:name)
    states      = select_format State.all.order(:name)
    counties    = select_format County.where(state: 60).order(:name)
    court_types = select_format Case.court_types.keys, :to_s, :titlecase

    props = {
      :resource      => @case,
      :resource_type => 'cases',
      :submit_path   => cases_path(),
      :selections => {
        :clients     => clients,
        :contacts    => contacts,
        :states      => states,
        :counties    => counties,
        :court_types => court_types
      },
      :selection_urls => {
        :clients  => clients_path(:format => :json),
        :contacts => client_contacts_path(:format => :json),
      },
      :modal_urls => {
        :clients  => new_client_path(:format => :json),
        :contacts => new_client_contact_path(:format => :json)
      }
    }

    form_repsonse(props)
  end

  # GET /cases/1/edit
  def edit
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
      redirect_to @case, notice: 'Case was successfully updated.'
    else
      render :edit
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
end
