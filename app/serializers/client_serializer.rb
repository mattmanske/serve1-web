class ClientSerializer < ActiveModel::Serializer
  self.root = false

  attributes :id, :key, :name, :email, :address, :phone, :actions

  def actions
    {
      :view   => client_path(self.id),
      :edit   => edit_client_path(self.id, format: :json),
      # :delete => client_path(self.id)
    }
  end
end
