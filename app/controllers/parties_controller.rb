class PartiesController < ApplicationController
  before_action :set_party, only: [:show, :edit, :update, :destroy]

  respond_to :json, only: [:index, :edit, :new, :create]

  # GET /parties
  def index
    @parties = Party.all

    respond_to do |format|
      format.html { render react_component: 'TableWrapper', props: table_props }
      format.json { render :json => select_format(@parties) }
    end
  end

  # GET /parties/1
  def show
  end

  # GET /parties/new
  def new
    @party = Party.new({ state_id: default_state })
    form_repsonse(form_props)
  end

  # GET /parties/1/edit
  def edit
    form_repsonse(form_props)
  end

  # POST /parties
  def create
    @party = Party.new(party_params)

    if @party.save
      render json: { resource: @party, redirect: parties_path() }
    else
      render json: { party: @party.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /parties/1
  def update
    if @party.update(party_params)
      render json: { resource: @party, redirect: parties_path() }
    else
      render json: { party: @party.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /parties/1
  def destroy
    @party.destroy
    redirect_to parties_url, notice: 'Party was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_party
      @party = Party.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def party_params
      params.require(:party).permit(:name, :address, :state_id, :county_id, :municipality_id)
    end

    # Setup form
    def form_props
      states         = select_format State.all.order(:name)
      counties       = select_format County.where(state: @party.state_id).order(:name)
      municipalities = select_format Municipality.where(county: @party.county_id).order(:name), :id, :title

      {
        :resource      => @party,
        :resource_type => 'parties',
        :action        => polymorphic_path(@party),
        :selections => {
          :states         => states,
          :counties       => counties,
          :municipalities => municipalities
        },
        :selection_urls => {
          :counties       => counties_path,
          :municipalities => municipalities_path
        },
      }
    end

    # Setup table
    def table_props
      {
        :sort_col => :id,
        :type     => 'parties',
        :rows     => @parties.map { |p| PartySerializer.new(p) },
        :columns => {
          :id            => 'ID',
          :service_count => 'Service Count',
          :name          => 'Name',
          :location      => 'Location',
          :actions       => ''
        }.to_a
      }
    end
end
