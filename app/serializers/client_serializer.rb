class ClientSerializer < ActiveModel::Serializer
  root false

  attributes :id, :key, :name, :email, :address, :phone,
             :actions

  def actions
    {
      :view => client_path(object.id),
      :edit => edit_client_path(object.id, format: :json),
      # :delete => client_path(object.id)
    }
  end
end
