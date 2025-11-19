FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (Next.js needs dev deps to build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Set Next.js to run on port 80
ENV PORT=80

# Expose port 80 for docker-compose to use
EXPOSE 80

# Start the Next.js production server
CMD ["npm", "run", "start"]