class ClientContactsController < ApplicationController
  before_action :set_client_contact, only: [:show, :edit, :update, :destroy]

  respond_to :json, only: [:index, :new, :create]

  # GET /client_contacts
  def index
    @client_contacts = ClientContact.all.order(:name)

    respond_to do |format|
      format.html
      format.json { render :json => select_format(@client_contacts) }
    end
  end

  # GET /client_contacts/1
  def show
    respond_to do |format|
      format.html
      format.json { render :json => @client_contact }
    end
  end

  # GET /client_contacts/new
  def new
    @client_contact = ClientContact.new

    clients = select_format Client.all().order(:name)

    props = {
      :resource      => @client_contact,
      :resource_type => 'contacts',
      :submit_path   => client_contacts_path(),
      :selections    => { :clients => clients }
    }

    form_repsonse(props)
  end

  # GET /client_contacts/1/edit
  def edit
  end

  # POST /client_contacts
  def create
    @client_contact = ClientContact.new(client_contact_params)

    if @client_contact.save
      render json: { resource: @client_contact, redirect: client_contacts_path() }
    else
      render json: { client_contact: @client_contact.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /client_contacts/1
  def update
    if @client_contact.update(client_contact_params)
      redirect_to @client_contact, notice: 'Client contact was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /client_contacts/1
  def destroy
    @client_contact.destroy
    redirect_to client_contacts_url, notice: 'Client contact was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_client_contact
      @client_contact = ClientContact.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def client_contact_params
      params.require(:client_contact).permit(:client_id, :name, :email, :address, :phone)
    end
end
