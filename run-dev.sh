#!/bin/bash

# Function to load environment variables from a file
load_env() {
  if [ -f "$1" ]; then
    export $(cat "$1" | grep -v '^#' | xargs)
  fi
}

# Load environment variables for client
load_env ./client/.env

# Load environment variables for server
load_env ./api/.env

# Run Docker Compose
docker-compose up --build
