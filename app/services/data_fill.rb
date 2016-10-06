class DataFill

  def fill_tenant
    create_clients(13)
    create_cases(24)
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

  def create_cases(count)
    count.times do |index|
      client     = Client.offset(rand(Client.count)).first()
      contact    = ClientContact.where(:client_id => client.id).order("RANDOM()").first()
      county     = County.where(:state_id => 60).order("RANDOM()").first()
      court_type = Case.court_types[Case.court_types.keys.sample]

      kase = Case.create({
        :key               => ['ID-', Faker::Address.building_number].join(),
        :client_id         => client.id,
        :client_contact_id => contact.id,
        :state_id          => 60,
        :county_id         => county.id,
        :court_type        => court_type,
        :plantiff          => Faker::Name.name,
        :plantiff_et_al    => [true, false].sample,
        :defendant         => Faker::Name.name,
        :defendant_et_al   => [true, false].sample
      })

      create_jobs(kase, rand(2..9))
    end
  end

  def create_jobs(kase, count)
    count.times do |index|
      status = Job.statuses[Job.statuses.keys.sample]

      job = Job.create({
        :key           => [kase.key, index+1].join('-'),
        :case_id       => kase.id,
        :status        => status,
        :date_sent     => (status >= 3) ? Faker::Date.backward(7) : nil,
        :date_received => Faker::Date.between(21.days.ago, 8.days.ago),
        :notes         => Faker::Lorem.paragraph,
        :amount_cents  => ([30, 45, 50, 75].sample)*100
      })

      create_services(job, rand(1..3)) unless (status == 'received')
    end
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
        :service_date       => (served) ? Faker::Date.backward(7) : nil,
        :attempts           => (served) ? [*1..3].sample : nil,
        :mileage            => (served) ? [*5..54].sample : nil,
        :notes              => (served) ? Faker::Lorem.paragraph : nil,
        :payment_cents      => (served) ? ([10, 15, 20, 25, 30].sample)*100 : nil
      })
    end
  end

  def create_party(index)
    if (index == 0 || [true, false].sample)
      county       = County.where(:state_id => 60).order("RANDOM()").first()
      municipality = Municipality.where(:county_id => county.id).order("RANDOM()").first()

      party = Party.create({
        :name            => [true, false].sample ? Faker::Name.name_with_middle : Faker::Company.name,
        :address         => [Faker::Address.street_address, Faker::Address.city, Faker::Address.state_abbr].join(', '),
        :state_id        => 60,
        :county_id       => county.id,
        :municipality_id => municipality.id
      })
    else
      party = Party.offset(rand(Party.count)).first()
    end
  end

  def clear_records
    conn   = ActiveRecord::Base.connection
    tables = ['clients', 'jobs', 'client_contacts', 'cases', 'parties', 'services', 'attachments', 'affidavits', 'documents']
    conn.execute("TRUNCATE #{tables * ', '} RESTART IDENTITY")
  end
end
