require 'csv'

# Import state data
if State.count == 0
  puts 'Parsing US States CSV...'

  CSV.foreach("#{Rails.root}/lib/assets/states.csv") do |row|
    state_code = row[0]
    state_name = row[1]
    State.create_with(name: state_name).find_or_create_by!(two_digit_code: state_code)
  end

  puts "#{State.count} states added."
end

# Import county data
if County.count == 0
  puts 'Parsing US Counties CSV...'

  CSV.foreach("#{Rails.root}/lib/assets/counties.csv") do |row|
    state_code  = row[0]
    county_name = row[1]
    County.find_or_create_by!(state_id: State.find_by_two_digit_code(state_code).id, name: county_name)
  end

  puts "#{County.count} counties added."
end
