# Subscription Platform

A modern Rails application for managing subscriptions, featuring a React frontend and live code reloading for development.

## Requirements

- Ruby 3.3.4
- Rails 8.0.2
- Node.js (v16+ recommended)
- npm or yarn
- PostgreSQL

## Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/Naing-Lynn-Aung/subscription_platform.git
   cd subscription_platform
   ```

2. **Install Ruby gems**
   ```sh
   bundle install
   ```

3. **Install JavaScript dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

4. **Database setup**
   ```sh
   rails db:create db:migrate db:seed
   ```

5. **Start the development server**
   - If using Docker:
     ```sh
     docker compose up
     ```
   - If running locally:
     ```sh
     bin/dev
     ```
     This will start both the Rails server and the React build watcher.

6. **Visit the app**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

```sh
bundle exec rspec
```

## Project Structure

- `app/` - Rails application code
- `app/javascript/` - React frontend code
- `app/assets/builds/` - Compiled frontend assets
- `public/` - Static files served by Rails
- `config/` - Rails configuration files

## Development Notes

- The app uses `jsbundling-rails` for JavaScript and React integration.
- Live reloading is enabled for both backend and frontend code.
- Static assets are built to `app/assets/builds` and served by Rails.

## Deployment

1. Build assets for production:
   ```sh
   RAILS_ENV=production bundle exec rails assets:precompile
   ```
2. Run database migrations:
   ```sh
   RAILS_ENV=production rails db:migrate
   ```
3. Start the Rails server:
   ```sh
   RAILS_ENV=production rails server
   ```

## License

MIT

---