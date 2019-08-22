FROM node:10

WORKDIR /app

# Copy source code ready for compilation
COPY src/ ./src/

# Copy metadata files
COPY package*.json tsconfig* ./

# Create config.json from config.sample.json
COPY config.sample.json config.json

# Install and compile
RUN npm ci
RUN npm run build

# Allow the bot token to be provided as an environment variable
# This is the only configuration item that can't use a default value
# If not provided as an environment variable, the token is expected to be provided by a mounted config file
ENV TOKEN ""

# Install 'forever', package to auto-restart on failure
RUN npm install -g forever

# Start the app using forever when the container runs
CMD forever dist/index.js