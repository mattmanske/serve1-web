include ActionView::Helpers::TextHelper

class ServiceSerializer < ActiveModel::Serializer
  root false

  attributes :id, :job_key, :status_name, :party_name,
             :person_name, :person_title, :attempts,
             :service_type_name, :date_served, :notes,
             :actions

  def job_key
    object.job.key
  end

  def party_name
    object.party.name
  end

  def notes
    truncate(object.notes)
  end

  def actions
    {
      :view => service_path(object.id),
      :edit => edit_service_path(object.id, format: :json),
      **((object.status == 'served') ? {:pdf  => service_path(object.id, format: :pdf)} : {})
      # :delete => service_path(object.id)
    }
  end
end
