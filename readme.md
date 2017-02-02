# Serve1 Application

This is the main web application service for Serve1, built off Rails 4.2 using postgreSQL.

Important gems to be aware of:
- Rails: application framework (https://github.com/rails/rails)
- Devise: user authentication (https://github.com/plataformatec/devise)
- Apartment: multi-tenant management (https://github.com/influitive/apartment)

### Local Setup

Serve1 uses postgreSQL as it's database. You'll need to have postgreSQL installed and a user with database creation privileges.
Once you have a user setup in postgres, setup your initial environment variables like so:

```
echo "DATABASE_HOST=localhost" >> .env
echo "DATABASE_USER=your_chosen_username" >> .env
echo "DATABASE_PASSWORD=your_chosen_password" >> .env
echo "SESSION_DOMAIN=lvh.me" >> .env
echo "RACK_ENV=development" >> .env
echo "PORT=3000" >> .env
```

Run the following commands in the project directory once you've downloaded the code and have postgreSQL installed.

```
$ bundle install
$ foreman run rake db:create db:migrate db:seed
```

Serve1 uses Puma as the default webserver instead of the rails default, webrick. Start up your server with:

```
npm run start-hot-dev
foreman start
```

_**NOTE:** This application relies on subdomains to identify the proper data tenants. Instead of visiting `http://localhost:3000` for your local server, you'll need to use `http://lvh.me:3000`_


### React Generators

Package comes with a generator for new React components & containers. Run the following and it will pop up a shot prompt that will generate new component bundles and register them within the RWR framework.

```
npm run generate
```
