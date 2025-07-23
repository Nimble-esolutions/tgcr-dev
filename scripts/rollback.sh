#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <build-number>"
  exit 1
fi

BUILD_NUMBER=$1

# Load environment variables
source /home/deploy/deploy-tgcr/.env

# Stop and remove current containers
echo "Stopping and removing current containers..."
docker-compose -f /home/deploy/deploy-tgcr/docker-compose.yml down || true

# Run previous version
echo "Rolling back to build $BUILD_NUMBER..."
export BUILD_NUMBER=$BUILD_NUMBER
docker-compose -f /home/deploy/deploy-tgcr/docker-compose.yml up -d

echo "Rollback to build $BUILD_NUMBER completed successfully."