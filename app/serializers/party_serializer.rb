class PartySerializer < ActiveModel::Serializer

  attributes :id, :service_count, :name, :location, :actions

  def actions
    {
      :view => party_path(object.id),
      :edit => edit_party_path(object.id, format: :json),
      # :delete => party_path(object.id)
    }
  end
end
