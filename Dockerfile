# ==============================================================================
# Comfort Journey - Production Multi-Stage Dockerfile
# Stage 1: Build Vite React SPA + SSG Pre-rendered Pages (Node.js 20)
# Stage 2: Ultra-lightweight Nginx Web Server & Directus CMS Reverse Proxy (Alpine)
# ==============================================================================

# ----------------- Stage 1: Build Frontend Assets -----------------
FROM node:20-alpine AS builder

WORKDIR /app

# Cache package dependencies
COPY package*.json ./
RUN npm install --no-audit

# Copy full application source code
COPY . .

# Run production build (Compiles Vite JS/CSS, generates sitemap.xml, & pre-renders 60 SSG pages)
RUN npm run build

# ----------------- Stage 2: Production Nginx Server -----------------
FROM nginx:1.25-alpine AS production

LABEL maintainer="Comfort Journey <admin@comfortjourney.com>"
LABEL description="Comfort Journey Luxury Travel - Production Frontend & CMS Proxy"

# Remove default boilerplate configuration
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom Comfort Journey Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets and pre-rendered SSG snapshots from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard web ports
EXPOSE 80

# Health check to ensure Nginx is responding
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/healthz || exit 1

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
