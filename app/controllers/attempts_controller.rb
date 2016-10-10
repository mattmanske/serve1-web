class AttemptsController < ApplicationController
  before_action :set_attempt, only: [:show, :edit, :update, :destroy]

  respond_to :json, only: [:index, :show, :new, :create]

  has_scope :client_id

  # GET /attempts
  def index
    @attempts = apply_scopes(Attempt).all

    respond_to do |format|
      format.html { render react_component: 'TableWrapper', props: table_props }
      format.json { render :json => select_format(@attempts) }
    end
  end

  # GET /attempts/1
  def show
    form_repsonse(form_props)
  end

  # GET /attempts/new
  def new
    @service = Service.find(params[:service_id])
    @attempt = Attempt.new({ service_id: @service_id })
    form_repsonse(form_props)
  end

  # GET /attempts/1/edit
  def edit
    form_repsonse(form_props)
  end

  # POST /attempts
  def create
    @attempt = Attempt.new(attempt_params)

    if @attempt.save
      render json: { resource: @attempt, redirect: service_attempts_path() }
    else
      render json: { attempt: @attempt.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /attempts/1
  def update
    if @attempt.update(attempt_params)
      render json: { resource: @attempt, redirect: service_attempts_path() }
    else
      render json: { attempt: @attempt.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /attempts/1
  def destroy
    @attempt.destroy
    redirect_to service_attempts_url, notice: 'Attempt was successfully destroyed.'
  end

private

  def set_attempt
    @attempt = Attempt.find(params[:id])
  end

  def attempt_params
    params.require(:attempt).permit(:service_id, :user_id, :address, :attempted_at, :successful, :mileage, :payment, :notes)
  end

  def form_props
    clients = select_format Client.all().order(:name)

    {
      :type     => 'attempts',
      :resource => @attempt,
      :action   => polymorphic_path([@service, @attempt]),
    }
  end

  def table_props
    {
      :sort_col => :created_at,
      :type     => 'attempts',
      :rows     => @attempts.map { |a| AttemptSerializer.new(a) },
      :columns => {
        :job_number     => 'Job #',
        :server_name    => 'Server',
        :party_name     => 'Service Party',
        :successful     => 'Successful',
        :date_attempted => 'Date',
        :time_attempted => 'Time',
        :address        => 'Address',
        :notes          => 'Notes',
        :actions        => ''
      }.to_a
    }
  end
end
