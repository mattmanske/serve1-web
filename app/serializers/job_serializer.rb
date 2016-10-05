include ActionView::Helpers::TextHelper

class JobSerializer < ActiveModel::Serializer
  root false

  attributes :id, :key, :status_name, :case_title, :notes,
             :recieved_date, :sent_date, :actions

  def case_title
    object.case.title
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
