class CasesController < ApplicationController
  before_action :set_case, only: [:show, :edit, :update, :destroy]

  respond_to :json, only: [:index, :edit, :new, :create]

  # GET /cases
  def index
    @cases = Case.all.order(:number)

    respond_to do |format|
      format.html { render react_component: 'TableWrapper', props: table_props }
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

  def set_case
    @case = Case.find(params[:id])
  end

  def case_params
    params.require(:case).permit(:number, :state_id, :county_id, :court_type, :plantiff, :plantiff_et_al, :defendant, :defendant_et_al)
  end

  def form_props
    states      = select_format State.all.order(:name)
    counties    = select_format County.where(state: @case.state_id).order(:name)
    court_types = select_format Case.court_types.keys, :to_s, :titlecase

    {
      :type     => 'cases',
      :resource => @case,
      :action   => polymorphic_path(@case),
      :selections => {
        :states      => states,
        :counties    => counties,
        :court_types => court_types
      }
    }
  end

  def table_props
    {
      :sort_col => :number,
      :type     => 'cases',
      :rows     => @cases.map { |c| CaseSerializer.new(c) },
      :columns => {
        :number       => 'Number',
        :title        => 'Case',
        :location     => 'Location',
        :court_name   => 'Court',
        :actions      => ''
      }.to_a
    }
  end
end
