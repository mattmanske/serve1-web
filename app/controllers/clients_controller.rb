class ClientsController < ApplicationController
  before_action :set_client, only: [:show, :edit, :update, :destroy]

  respond_to :json, only: [:index, :edit, :new, :create, :destroy]

  # GET /clients
  def index
    @clients = Client.all.order(:name)

    respond_to do |format|
      format.html { render react_component: 'TableWrapper', props: table_props }
      format.json { render :json => select_format(@clients) }
    end
  end

  # GET /clients/1
  def show
  end

  # GET /clients/new
  def new
    @client = Client.new
    form_repsonse(form_props)
  end

  # GET /clients/1/edit
  def edit
    form_repsonse(form_props)
  end

  # POST /clients
  def create
    @client = Client.new(client_params)

    if @client.save
      render json: { resource: @client, redirect: clients_path(), selections: associated_selections }
    else
      render json: { client: @client.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /clients/1
  def update
    if @client.update(client_params)
      render json: { resource: @client, redirect: clients_path(), selections: associated_selections }
    else
      render json: { client: @client.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /clients/1
  def destroy
    @client.destroy

    respond_to do |format|
      format.html { redirect_to clients_url, notice: 'Client was successfully destroyed.' }
      format.json
    end
  end

private

  def set_client
    @client = Client.find(params[:id])
  end

  def client_params
    params.require(:client).permit(:key, :name, :address, :phone, :email)
  end

  def associated_selections
    clients  = Client.all.order(:name)
    contacts = ClientContact.where(client_id: params[:id]).order(:first_name)

    {
      :clients  => select_format(clients),
      :contacts => select_format(contacts)
    }
  end

  def form_props
    {
      :type     => 'clients',
      :resource => @client,
      :action   => polymorphic_path(@client)
    }
  end

  def table_props
    {
      :sort_col => :name,
      :type     => 'clients',
      :rows     => @clients.map { |c| ClientSerializer.new(c) },
      :columns => {
        :key     => 'ID',
        :name    => 'Name',
        :email   => 'Email',
        :address => 'Address',
        :phone   => 'Phone #',
        :actions => ''
      }.to_a
    }
  end
end
