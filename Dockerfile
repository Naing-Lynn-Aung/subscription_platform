# Development Dockerfile for Rails application
# This is optimized for development with live code reloading

FROM ruby:3.3.4

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  curl \
  libpq-dev \
  postgresql-client \
  vim \
  nodejs \
  npm \
  yarn \
  git \
  curl \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy package.json package-lock.json
COPY package.json package-lock.json* ./

# Install JS dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Convert binstubs to Linux format (if needed)
RUN chmod +x bin/*

# Expose port 3000
EXPOSE 3000

# Start Rails server + React build watcher
CMD ["sh", "-c", "npm run build:watch & bin/rails server -b 0.0.0.0 & wait -n"]