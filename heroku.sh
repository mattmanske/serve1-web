forevercmd="./node_modules/forever/bin/forever ./app/react/node_server.js"
$forevercmd &disown
bundle exec puma -C config/puma.rb
