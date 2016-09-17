namespace :dev_cleanups do

  desc "Drops all organization & user data"
  task drop_public: :environment do
    Organization.pluck(:subdomain).each do |subdomain|
      Apartment::Tenant.drop(subdomain) rescue nil
    end
    puts 'All Schemas Dropped'

    User.destroy_all
    ActiveRecord::Base.connection.reset_pk_sequence!('users')
    puts 'Users Table Reset'

    Organization.destroy_all
    ActiveRecord::Base.connection.reset_pk_sequence!('organizations')
    puts 'Organizations Table Reset'

    OrganizationUser.destroy_all
    ActiveRecord::Base.connection.reset_pk_sequence!('organization_users')
    puts 'Organization Users Table Reset'
  end

end
