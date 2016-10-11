class ServicesController < ApplicationController
  before_action :set_service, only: [:show, :edit, :update, :destroy, :pdf]

  respond_to :json, only: [:index, :edit, :new, :create]

  # GET /services
  def index
    @services = Service.all.order(created_at: :desc)

    respond_to do |format|
      format.html { render react_component: 'TableWrapper', props: table_props }
      format.json { render :json => select_format(@services) }
    end
  end

  # GET /services/1
  def show
    respond_to do |format|
      format.html
      format.pdf { render pdf: 'affidavit', layout: 'pdf.html', show_as_html: params[:debug].present? }
    end
  end

  # GET /services/new
  def new
    @service = Service.new({ job_id: params[:job], status: :dispatched })
    form_repsonse(form_props)
  end

  # GET /services/1/edit
  def edit
    form_repsonse(form_props)
  end

  # POST /services
  def create
    @service = Service.new(service_params)

    if @service.save
      render json: { resource: @service, redirect: services_path() }
    else
      render json: { service: @service.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /services/1
  def update
    if @service.update(service_params)
      render json: { resource: @service, redirect: services_path() }
    else
      render json: { service: @service.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /services/1
  def destroy
    @service.destroy
    redirect_to services_url, notice: 'Service was successfully destroyed.'
  end

private

  def set_service
    @service = Service.find(params[:id])
  end

  def service_params
    params.require(:service).permit(:job_id, :party_id, :status, :service_type, :service_date, :person_name, :person_title, :person_capacity)
  end

  def form_props
    jobs    = select_format Job.all()
    parties = select_format Party.all().order(:name)
    status  = select_format Service.statuses.keys, :to_s, :titlecase
    types   = select_format Service.service_types.keys, :to_s, :titlecase

    {
      :type     => 'services',
      :resource => @service,
      :action   => polymorphic_path(@service),
      :selections => {
        :jobs    => jobs,
        :status  => status,
        :types   => types,
        :parties => parties
      }
    }
  end

  # Setup table
  def table_props
    {
      :sort_col => :created_at,
      :type     => 'services',
      :rows     => @services.map { |s| ServiceSerializer.new(s) },
      :columns => {
        :job_number        => 'Job #',
        :status_name       => 'Status',
        :party_name        => 'Party',
        :person_name       => 'Person',
        :person_title      => 'Title',
        :attempts_count    => 'Attempts',
        :service_type_name => 'Service Type',
        :actions           => ''
      }.to_a
    }
  end
end
