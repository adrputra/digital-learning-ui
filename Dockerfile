# Stage 1: Build stage using the official Alpine-based Bun image
FROM oven/bun:1.1.27-alpine as builder

WORKDIR /app

# Copy only the essential files for dependency installation
COPY package.json bun.lockb ./
# Install dependencies
RUN bun install

# Copy the rest of the source code, including Vite config
COPY . .

# Build the Vite project for production
RUN bun run build
RUN bun add -g serve

# Stage 2: Use the same image for the runtime to avoid issues with static dependencies
FROM oven/bun:1.1.27-alpine

# Copy over the built application and dependencies
COPY --from=builder /app /app

WORKDIR /app

# Expose the port your production server will run on
EXPOSE 3000

# Set the command to run the production server
CMD ["bun", "run", "preview"]
