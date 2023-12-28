# https://github.com/docker/awesome-compose/blob/master/react-nginx/Dockerfile

FROM node:latest AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json /app/

# Install packages
RUN npm install

# Copy all files
COPY . .

# Run build command for react
RUN npm run build

# Nginx setup
FROM nginx:stable

# Copy config nginx
COPY --from=build-stage /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Change work directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build-stage /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]