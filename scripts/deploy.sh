#!/bin/bash
set -e

# Script Vars
RSA_KEY_SIZE=4096
CERT_PATH="./nginx/certbot"
SWAP_SIZE="512M"  # Swap size 512MB for 1GB set to 1G

# Environment variable received from GitHub Actions
echo "--- Environment Debug ---"
echo "APP_DIR: $APP_DIR"
echo "----------------------"

echo "Starting deployment script..."

# Check if swap is already enabled
if swapon --show | grep -q '^/swapfile'; then
  echo "Swap already exists. Skipping creation."
else
  echo "Swap not found. Creating swap space..."
  echo "adding swap space..."
  sudo fallocate -l $SWAP_SIZE /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
fi

# Load environment variables
source $APP_DIR/.env

# Verify variables
echo "Verifying environment variables..."
for var in IMAGE_NAME IMAGE_TAG APP_DOMAIN ADMIN_EMAIL; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

# Add debug logging
echo "Using image: $IMAGE_NAME:$IMAGE_TAG"

# Verify Docker login
echo "Verifying Docker authentication..."
if ! docker pull $IMAGE_TAG > /dev/null 2>&1; then
  echo "Error: Failed to pull image. Check Docker authentication."
  exit 1
fi
echo "Docker authentication verified."
# Pull the latest image
docker-compose -f $APP_DIR/docker-compose.yml pull

# Stop and remove old containers
echo "Stopping and removing old containers..."
docker-compose -f $APP_DIR/docker-compose.yml down || true


### Check if the nginx/certbot/conf directory exists

CERT_FILE="/etc/letsencrypt/live/$APP_DOMAIN/fullchain.pem"

if [ -f "$CERT_FILE" ]; then
  # Check if the certificate expires in more than 30 days
  EXPIRY_DATE=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)
  EXPIRY_SECS=$(date --date="$EXPIRY_DATE" +%s)
  NOW_SECS=$(date +%s)
  DAYS_LEFT=$(( (EXPIRY_SECS - NOW_SECS) / 86400 ))

  if [ "$DAYS_LEFT" -gt 15 ]; then
    echo "A valid SSL certificate already exists for $APP_DOMAIN ($DAYS_LEFT days left). Skipping certbot."
    SKIP_CERTBOT=1
  else
    echo "Certificate exists but expires in $DAYS_LEFT days. Will renew."
    SKIP_CERTBOT=0
  fi
else
  echo "No certificate found for $APP_DOMAIN. Will request a new one."
  SKIP_CERTBOT=0
fi

if [ "$SKIP_CERTBOT" -eq 0 ]; then
  sudo certbot certonly --standalone -d $APP_DOMAIN -d www.$APP_DOMAIN \
    --email $ADMIN_EMAIL --agree-tos --non-interactive --force-renewal

  # Check if certbot command was successful
  if [ $? -ne 0 ]; then
    echo "Error: Certbot failed to obtain certificates."
    exit 1
  fi
fi

#######END CERTBOT CHECK#######

echo "Create symbolic links to nginx/certbot/conf"
# Remove old directory or symlink
rm -rf /home/deploy/deploy-tgcr/nginx/certbot/conf

# Create symlink
ln -s /etc/letsencrypt /home/deploy/deploy-tgcr/nginx/certbot/conf


# Start new containers
echo "Starting new containers..."
docker-compose -f $APP_DIR/docker-compose.yml up -d

# # Copy certificates to the correct location
# echo "Copying certificates to $CERT_PATH..."
# sudo mkdir -p $CERT_PATH/conf/live/$APP_DOMAIN
# sudo cp /etc/letsencrypt/live/$APP_DOMAIN/fullchain.pem $CERT_PATH/conf/live/$APP_DOMAIN/fullchain.pem
# sudo cp /etc/letsencrypt/live/$APP_DOMAIN/privkey.pem $CERT_PATH/conf/live/$APP_DOMAIN/privkey.pem  
# sudo cp /etc/letsencrypt/live/$APP_DOMAIN/cert.pem $CERT_PATH/conf/live/$APP_DOMAIN/cert.pem
# sudo cp /etc/letsencrypt/live/$APP_DOMAIN/chain.pem $CERT_PATH/conf/live/$APP_DOMAIN/chain.pem 
# sudo cp /etc/letsencrypt/live/$APP_DOMAIN/README $CERT_PATH/conf/live/$APP_DOMAIN/README  

# OR







