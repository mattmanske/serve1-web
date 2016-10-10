class CaseSerializer < ActiveModel::Serializer

  attributes :id, :number, :title, :location, :court_name, :actions

  def actions
    {
      :view => case_path(object.id),
      :edit => edit_case_path(object.id, format: :json),
      # :delete => case_path(object.id)
    }
  end
end
