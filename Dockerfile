# 1. Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

# Install deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy and compile
COPY . .
RUN yarn build

# 2. Runtime image for server mode
FROM node:18-alpine AS runner
WORKDIR /app

# Only install production deps
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built output and public assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/assets ./assets


# Expose default Next.js port
EXPOSE 3000

# Start Next.js in server mode
CMD ["yarn", "start"]
