# Serve1 Application

This is the main web application service for Serve1, built off Rails 4.2 using postgreSQL.

Important gems to be aware of:
- Rails: application framework (https://github.com/rails/rails)

### Local Setup

Serve1 uses postgres as it's database. You'll need to have postgres installed and a user with database creation privileges.

Run the following commands in the project directory once you've downloaded the code and have postgres installed:

```
$ bundle install
$ cp config/application.yml.sample config/application.yml
```

Fill out the database keys in the newly created `config/application.yml` file, then run:

```
$ rake db:create db:migrate db:seed
```

You should now have a functioning application.

_**NOTE:** This application relies on subdomains to identify the proper data tenants. Instead of visiting `http://localhost:3000` for your local server, you'll need to use `http://lvh.me:3000`_
