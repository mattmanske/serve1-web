class CaseSerializer < ActiveModel::Serializer

  attributes :id, :key, :title, :location, :court_name,
             :contact_name, :actions

  def contact_name
    [object.client_contact.name, object.client.name].reject(&:blank?).join(', ')
  end

  def actions
    {
      :view => case_path(object.id),
      :edit => edit_case_path(object.id, format: :json),
      # :delete => case_path(object.id)
    }
  end
end
