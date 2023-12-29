FROM node:slim

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json .

# Install packages
RUN npm install --production

# Copy all files
COPY . .

# Install Prisma CLI globally
RUN npm install -g @prisma/cli

# Run Prisma migrations during image build
RUN npx prisma migrate deploy

# Expose the necessary port
EXPOSE 5000

# Run node
CMD ["npm", "start"]