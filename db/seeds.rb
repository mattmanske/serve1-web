require 'csv'

# Import state data
if State.count == 0
  puts 'Parsing US States CSV...'

  CSV.open("#{Rails.root}/lib/assets/states.csv", { headers: false }).each do |row|
    state_code = row[0]
    state_name = row[1]
    State.create_with(name: state_name).find_or_create_by!(two_digit_code: state_code)
  end

  puts "#{State.count} states added."
end

# Import county data
if County.count == 0
  puts 'Parsing WI Counties CSV...'

  CSV.open("#{Rails.root}/lib/assets/counties.csv", { headers: false }).each do |row|
    state_code  = row[0]
    county_name = row[1]
    County.find_or_create_by!(state_id: State.find_by_two_digit_code(state_code).id, name: county_name)
  end

  puts "#{County.count} counties added."
end

# Import municipality data
if Municipality.count == 0
  puts 'Parsing WI Municipalities CSV...'

  CSV.open("#{Rails.root}/lib/assets/municipalities.csv", { headers: true }).each do |row|
    county_name = row[10].titleize
    municipality_name = row[11].titleize
    municipality_type = case row[15]
                        when 'C' then 'City'
                        when 'T' then 'Town'
                        when 'V' then 'Village'
                        else row[15]
                        end
    Municipality.find_or_create_by!(county_id: County.find_by_name(county_name).id, name: municipality_name, category: municipality_type)
  end

  puts "#{Municipality.count} municipalities added."
end
