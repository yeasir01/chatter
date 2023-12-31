# https://github.com/docker/awesome-compose/blob/master/react-nginx/Dockerfile
FROM node:latest AS build

# Not set on build therefore we need to set required env's as args
ARG REACT_APP_AUTH0_DOMAIN=${REACT_APP_AUTH0_DOMAIN}
ARG REACT_APP_AUTH0_CLIENT_ID=${REACT_APP_AUTH0_CLIENT_ID}
ARG REACT_APP_AUTH0_AUDIENCE=${REACT_APP_AUTH0_AUDIENCE}
ARG GENERATE_SOURCEMAP=false
ARG NODE_ENV="production"

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json .

# Install packages
RUN npm install

# Copy all files
COPY . .

# Run build command for react
RUN npm run build

# Nginx setup
FROM nginx:stable

# Copy config nginx
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Change work directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]