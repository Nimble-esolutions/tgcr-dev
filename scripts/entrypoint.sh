#!/bin/sh
set -e

# Run Prisma migrations
npx prisma migrate deploy
# Seed the database (optional, remove if not needed in prod)
npx prisma db seed

# Start Next.js app
node server.js
echo "--------server started.--------"
