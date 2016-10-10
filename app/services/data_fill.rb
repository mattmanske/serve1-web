class DataFill

  def fill_tenant
    create_clients(13)
    create_jobs(24)
  end

  def clear_tenant
    clear_records
  end

private

  def create_clients(count)
    count.times do |index|
      client = Client.create({
        :key     => ['CL-', Faker::Address.building_number].join(),
        :name    => Faker::Company.name,
        :email   => Faker::Internet.safe_email,
        :address => [Faker::Address.street_address, Faker::Address.city, Faker::Address.state_abbr].join(', '),
        :phone   => Faker::PhoneNumber.cell_phone
      })

      create_client_contacts(client, rand(2..9))
    end
  end

  def create_client_contacts(client, count)
    count.times do |index|
      first_name = Faker::Name.first_name
      last_name = Faker::Name.last_name

      contact = ClientContact.create({
        :client_id  => client.id,
        :first_name => first_name,
        :last_name  => last_name,
        :email      => Faker::Internet.safe_email(last_name),
        :address    => client.address,
        :phone      => Faker::PhoneNumber.cell_phone
      })
    end
  end

  def create_jobs(count)
    count.times do |index|
      kase       = create_case() unless (rand(1..6) == 6)
      status     = Job.statuses[Job.statuses.keys.sample]
      client_id  = Client.offset(rand(Client.count)).first().id
      contact_id = ClientContact.where(:client_id => client_id).order("RANDOM()").first().id

      job = Job.create({
        :number            => (kase) ? [kase.number, index+1].join('-') : Faker::Address.building_number,
        :case_id           => (kase) ? kase.id : nil,
        :status            => status,
        :client_id         => client_id,
        :client_contact_id => contact_id,
        :sent_at           => (status >= 3) ? Faker::Date.backward(7) : nil,
        :received_at       => Faker::Date.between(21.days.ago, 8.days.ago),
        :notes             => Faker::Lorem.paragraph,
      })

      create_services(job, rand(2..6)) unless (status == 'received')
    end
  end

  def create_case()
    county_id   = County.where(:state_id => 60).order("RANDOM()").first().id
    court_type = Case.court_types[Case.court_types.keys.sample]

    kase = Case.create({
      :number          => [rand(82..99), rand(1..9), Faker::Address.building_number].join('-'),
      :state_id        => 60,
      :county_id       => county_id,
      :court_type      => court_type,
      :plantiff        => Faker::Name.name,
      :plantiff_et_al  => [true, false].sample,
      :defendant       => Faker::Name.name,
      :defendant_et_al => [true, false].sample
    })
  end

  def create_services(job, count)
    count.times do |index|
      party  = create_party(index)
      status = (job.status == 'dispatched') ? [:dispatched, :in_progress, :blocked].sample : :served
      type   = Service.service_types[Service.service_types.keys.sample]
      served = (status == :served)

      service = Service.create({
        :job_id             => job.id,
        :party_id           => party.id,
        :status             => status,
        :service_type       => (served) ? type : nil,
        :person_name        => (served) ? Faker::Name.name_with_middle : nil,
        :person_title       => (served) ? Faker::Name.title : nil,
        :person_capacity    => (served) ? Faker::Company.profession.capitalize : nil,
        :person_description => (served) ? Faker::Lorem.paragraph : nil,
      })

      create_attempts(service, rand(1..3), served) unless (status == 'dispatched')
      create_affidavit(service, job.case_id) if (served)
    end
  end

  def create_attempts(service, count, served)
    count.times do |index|
      attempt = Attempt.create({
        :user_id      => 1,
        :service_id   => service.id,
        :address      => [Faker::Address.street_address, Faker::Address.city, Faker::Address.state_abbr].join(', '),
        :attempted_at => Faker::Date.between(21.days.ago, 3.days.ago),
        :successful   => (served && index == count-1),
        :notes        => Faker::Lorem.paragraph
      })
    end
  end

  def create_affidavit(service, case_id)
    affidavit = Affidavit.create({
      :service_id       => service.id,
      :notary_state_id  => 60,
      :notary_county_id => 13,
      :header           => (case_id) ? nil : "NOTICE OF CLAIM AND INJURY AND CLAIM\nPURSUANT TO WIS. STATS. 893.80\nREGARDING #{service.party.name}"
    })
  end

  def create_party(index)
    if (index == 0 || [true, false].sample)
      county_id       = County.where(:state_id => 60).order("RANDOM()").first().id
      municipality_id = Municipality.where(:county_id => county_id).order("RANDOM()").first().id

      party = Party.create({
        :name            => [true, false].sample ? Faker::Name.name_with_middle : Faker::Company.name,
        :address         => [Faker::Address.street_address, Faker::Address.city, Faker::Address.state_abbr].join(', '),
        :state_id        => 60,
        :county_id       => county_id,
        :municipality_id => municipality_id
      })
    else
      party = Party.offset(rand(Party.count)).first()
    end
  end

  def clear_records
    conn   = ActiveRecord::Base.connection
    tables = ['clients', 'jobs', 'client_contacts', 'cases', 'parties', 'services', 'affidavits', 'attempts']
    conn.execute("TRUNCATE #{tables * ', '} RESTART IDENTITY")
  end
end
