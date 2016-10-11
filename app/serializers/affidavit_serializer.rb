class AffidavitSerializer < ActiveModel::Serializer

  attributes :id, :job_key, :case_name, :party_name,
             :person_name, :person_title, :actions

  def job_key
    object.service.job.number
  end

  def case_name
    object.service.job.case.try(:name)
  end

  def party_name
    object.service.party.name
  end

  def person_name
    object.service.person_name
  end

  def person_title
    object.service.person_title
  end

  def actions
    {
      :view     => affidavit_path(object.id, format: :pdf),
      :edit     => edit_affidavit_path(object.id, format: :json),
      :download => affidavit_path(object.id, format: :pdf)
      # :delete => service_path(object.id)
    }
  end
end
