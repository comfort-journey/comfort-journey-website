#!/bin/bash
set -e

echo ">>> [1/4] Pulling latest code from GitHub..."
cd /opt/comfort-journey-website
git pull origin main

echo ">>> [2/4] Building production Docker image..."
docker build -t comfort-journey-website:latest .

echo ">>> [3/4] Restarting website container..."
docker stop comfort-journey-website || true
docker rm comfort-journey-website || true
docker run -d \
  --name comfort-journey-website \
  --restart unless-stopped \
  --network comfort_journey_network \
  -p 80:80 \
  -p 443:443 \
  -v /opt/comfortjourney:/etc/nginx/ssl:ro,Z \
  comfort-journey-website:latest

echo ">>> [4/4] Verifying health status..."
sleep 3
docker ps --filter name=comfort-journey-website

echo "========================================="
echo " SUCCESS: Comfort Journey Website Updated!"
echo " Live on https://www.comfortjourney.in"
echo "========================================="
