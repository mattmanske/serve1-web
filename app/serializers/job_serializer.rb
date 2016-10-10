include ActionView::Helpers::TextHelper

class JobSerializer < ActiveModel::Serializer

  attributes :id, :number, :status_name, :case_title, :contact_name, :notes,
             :date_received, :date_sent, :actions

  def case_title
    object.case ? object.case.title : '-'
  end

  def contact_name
    object.client_contact.name
  end

  def notes
    truncate(object.notes)
  end

  def actions
    {
      :view => job_path(object.id),
      :edit => edit_job_path(object.id, format: :json),
      # :delete => job_path(object.id)
    }
  end
end
