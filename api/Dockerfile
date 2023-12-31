FROM node:18-buster

# Not set on build therefore we need to set required env's as args
ARG DATABASE_URL=${DATABASE_URL}

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json .

# Install packages
RUN npm ci --production

# Copy all files
COPY . .

# Update packages
RUN apt-get update -y && apt-get install -y openssl

# Install Prisma CLI globally
RUN npm install -g prisma@latest

RUN npx prisma generate

# Run node
CMD ["sh", "-c", "npx prisma migrate deploy && npm start > /app/logs/output.log 2>&1 && sleep infinity"]