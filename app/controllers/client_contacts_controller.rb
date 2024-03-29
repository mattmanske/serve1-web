class ClientContactsController < ApplicationController
  before_action :set_client_contact, only: [:show, :edit, :update, :destroy]

  respond_to :json, only: [:index, :show, :new, :create]

  has_scope :client_id

  # GET /client_contacts
  def index
    @client_contacts = apply_scopes(ClientContact).all.order(:first_name)

    respond_to do |format|
      format.html { render react_component: 'TableWrapper', props: table_props }
      format.json { render :json => select_format(@client_contacts) }
    end
  end

  # GET /client_contacts/1
  def show
    form_repsonse(form_props)
  end

  # GET /client_contacts/new
  def new
    @client = Client.find(params[:client_id])
    @client_contact = ClientContact.new({ client_id: @client_id })
    form_repsonse(form_props)
  end

  # GET /client_contacts/1/edit
  def edit
    form_repsonse(form_props)
  end

  # POST /client_contacts
  def create
    @client_contact = ClientContact.new(client_contact_params)

    if @client_contact.save
      render json: { resource: @client_contact, redirect: client_contacts_path(), selections: associated_selections }
    else
      render json: { client_contact: @client_contact.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /client_contacts/1
  def update
    if @client_contact.update(client_contact_params)
      render json: { resource: @client_contact, redirect: client_contacts_path(), selections: associated_selections }
    else
      render json: { client_contact: @client_contact.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /client_contacts/1
  def destroy
    @client_contact.destroy
    redirect_to client_contacts_url, notice: 'Client contact was successfully destroyed.'
  end

private

  def set_client_contact
    @client_contact = ClientContact.find(params[:id])
  end

  def client_contact_params
    params.require(:client_contact).permit(:client_id, :first_name, :last_name, :email, :address, :phone)
  end

  def associated_selections
    contacts = ClientContact.where(client_id: @client_contact.client_id).order(:first_name)

    {
      :contacts => select_format(contacts)
    }
  end

  def form_props
    clients = select_format Client.all().order(:name)

    {
      :type     => 'contacts',
      :resource => @client_contact,
      :action   => polymorphic_path([@client, @client_contact]),
      :selections => {
        :clients => clients
      }
    }
  end

  def table_props
    {
      :sort_col => :name,
      :type     => 'contacts',
      :rows     => @client_contacts.map { |c| ClientContactSerializer.new(c) },
      :columns => {
        :client_name => 'Client',
        :name        => 'Name',
        :email       => 'Email',
        :address     => 'Address',
        :phone       => 'Phone #',
        :actions     => ''
      }.to_a
    }
  end
end
