# Use Node.js 20
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy backend source code
COPY . .

# Backend listens on port 5000
EXPOSE 5000

# Start the Express server
CMD ["npm", "start"]
