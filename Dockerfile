# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# 1. Copy package files
COPY package.json package-lock.json ./

# 2. Install deps 
RUN npm ci

# 3. Copy Prisma files and generate client
COPY prisma ./prisma
RUN npx prisma generate

# 4. Copy everything else and build
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy necessary files
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts/entrypoint.sh ./
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

RUN chmod +x ./entrypoint.sh

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

CMD [ "./entrypoint.sh" ]
