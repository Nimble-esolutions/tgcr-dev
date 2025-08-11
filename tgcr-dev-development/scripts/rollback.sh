#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <build-number>"
  exit 1
fi

BUILD_NUMBER=$1

# Load environment variables
source /home/deploy/tgcr-app/.env

# Stop and remove current containers
echo "Stopping and removing current containers..."
docker-compose -f /home/deploy/tgcr-app/docker-compose.prod.yml down || true

# Run previous version
echo "Rolling back to build $BUILD_NUMBER..."
export BUILD_NUMBER=$BUILD_NUMBER
docker-compose -f /home/deploy/tgcr-app/docker-compose.prod.yml up -d

echo "Rollback to build $BUILD_NUMBER completed successfully."