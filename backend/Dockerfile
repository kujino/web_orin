FROM ruby:3.3.6

ENV LANG=C.UTF-8 \
    TZ=Asia/Tokyo

RUN apt-get update -qq && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

EXPOSE 3000