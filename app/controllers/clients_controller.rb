class ClientsController < ApplicationController
  before_action :set_client, only: [:show, :edit, :update, :destroy]

  respond_to :json, only: [:index, :new, :create]

  # GET /clients
  def index
    @clients = Client.all.order(:name)

    respond_to do |format|
      format.html
      format.json { render :json => select_format(@clients) }
    end
  end

  # GET /clients/1
  def show
    respond_to do |format|
      format.html
      format.json { render :json => @client }
    end
  end

  # GET /clients/new
  def new
    @client = Client.new

    props = {
      :resource      => @client,
      :resource_type => 'clients',
      :submit_path   => clients_path(),
    }

    form_repsonse(props)
  end

  # GET /clients/1/edit
  def edit
  end

  # POST /clients
  def create
    @client = Client.new(client_params)

    if @client.save
      render json: { resource: @client, redirect: clients_path() }
    else
      render json: { client: @client.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /clients/1
  def update
    if @client.update(client_params)
      redirect_to @client, notice: 'Client was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /clients/1
  def destroy
    @client.destroy
    redirect_to clients_url, notice: 'Client was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_client
      @client = Client.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def client_params
      params.require(:client).permit(:key, :name, :address, :phone, :email)
    end
end
