FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy application files
COPY . .

# Build frontend assets
RUN pnpm run frontend:build

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "app.js"]
