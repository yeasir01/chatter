# https://github.com/docker/awesome-compose/blob/master/react-nginx/Dockerfile

FROM node:latest AS build

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json .

# Install packages
RUN npm install

# Copy all files
COPY . .

#Needed for build step.
ARG REACT_APP_AUTH0_DOMAIN=${REACT_APP_AUTH0_DOMAIN:?error}
ARG REACT_APP_AUTH0_CLIENT_ID=${REACT_APP_AUTH0_CLIENT_ID:?error}
ARG REACT_APP_AUTH0_AUDIENCE=${REACT_APP_AUTH0_AUDIENCE:?error}
ARG REACT_APP_API_SERVER=${REACT_APP_API_SERVER:?error}
ARG GENERATE_SOURCEMAP=false

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