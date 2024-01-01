FROM node:18-buster

# Not set on build therefore we need to set required env's as args
ARG DATABASE_URL=${DATABASE_URL}

# Set working directory
WORKDIR /app

# Install curl
RUN apt-get update && apt-get install -y curl

# Copy package.json
COPY package*.json .

# Install packages
RUN npm ci --production

# Copy all files
COPY . .

# Install Prisma CLI globally
RUN npm install -g prisma@latest

#Generate
RUN npx prisma generate 

#Run migerations
CMD ["./wait-for-db.sh", "database:5432", "--", "npx", "prisma", "migrate", "deploy"]

ENTRYPOINT [ "node", "index.js" ]
