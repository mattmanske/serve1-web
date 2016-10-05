class ClientContactSerializer < ActiveModel::Serializer
  root false

  attributes :id, :client_name, :name, :email, :address,
             :phone, :actions

  def client_name
    object.client.name
  end

  def actions
    {
      :view => client_contact_path(object.id),
      :edit => edit_client_contact_path(object.id, format: :json),
      # :delete => client_contact_path(object.id)
    }
  end
end
