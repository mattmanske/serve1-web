class AttemptSerializer < ActiveModel::Serializer

  attributes :id, :server_name, :job_number, :party_name, :successful,
             :date_attempted, :time_attempted, :address, :notes,
             :actions

  def job_number
    object.service.job.number
  end

  def party_name
    object.service.party.name
  end

  def successful
    object.successful ? 'yes' : ''
  end

  def actions
    {
      :view => attempt_path(object.id),
      :edit => edit_attempt_path(object.id, format: :json),
      # :delete => attempt_path(object.id)
    }
  end
end
