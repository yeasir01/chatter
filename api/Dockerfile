FROM node:slim

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json .

# Install packages
RUN npm install --production

# Copy all files
COPY . .

# Update packages
RUN apt-get update -y && apt-get install -y openssl

#Needed for build step. ENV variables not avialable until after build.
ARG DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}?schema=public

# Install Prisma CLI globally
RUN npm install -g prisma@latest

RUN npx prisma generate

# Run node
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]