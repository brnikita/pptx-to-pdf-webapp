# Stage 1: Base stage with official Bun image
FROM oven/bun:canary-alpine AS development-base

# Install Node.js (and npm) in addition to Bun
RUN apk add --update nodejs npm

WORKDIR /usr/src/app

# Install dependencies (including devDependencies for development)
COPY package.json bun.lockb ./
RUN bun install

# Copy over the rest of your application code
COPY . .

# Make sure port 3000 is exposed, which is the default port for Next.js development server
EXPOSE 3000/tcp

# Use 'bun run dev' to start the Next.js development server for hot reloading
# Adjust the script name if your package.json uses a different script for development
CMD ["bun", "run", "dev"]