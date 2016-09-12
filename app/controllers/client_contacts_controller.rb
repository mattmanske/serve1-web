class ClientContactsController < ApplicationController
  before_action :set_client_contact, only: [:show, :edit, :update, :destroy]

  # GET /client_contacts
  def index
    @client_contacts = ClientContact.all
  end

  # GET /client_contacts/1
  def show
  end

  # GET /client_contacts/new
  def new
    @client_contact = ClientContact.new
  end

  # GET /client_contacts/1/edit
  def edit
  end

  # POST /client_contacts
  def create
    @client_contact = ClientContact.new(client_contact_params)

    if @client_contact.save
      redirect_to @client_contact, notice: 'Client contact was successfully created.'
    else
      render :new
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
