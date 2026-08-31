# Comfort Journey - Directus Headless CMS & AWS Cloud Architecture Guide
**Phase 1 Infrastructure Blueprint & Deployment Playbook**

This handbook provides step-by-step instructions for deploying Directus Headless CMS on **AWS Lightsail / EC2** and connecting media uploads to **AWS S3**.

---

## 1. Local-First Testing Workflow (For Non-Tech Team Members)

Before touching AWS, your team can test creating blogs and tour packages locally on your laptop:

1. Open your terminal in the `cms/` folder:
   ```bash
   cd "cms"
   docker compose up -d
   ```
2. Open your browser to **`http://localhost:8055`**
3. Log in with the pre-configured admin credentials:
   - **Email:** `admin@comfortjourney.com`
   - **Password:** `comfort_admin_pass_1992!`
4. Create or edit blog posts and tour packages.
5. In your frontend, navigate to `#/admin` -> **Directus & AWS Bridge** tab -> click **Ping Server**. You will see:
   `🟢 Connected (200 OK) - Directus CMS Live`
6. Newly created blogs will instantly generate dynamic URLs e.g. `#/blog/top-7-luxury-stays-in-kashmir-2026`!

---

## 2. Production AWS Cloud Architecture

```
                       ┌──────────────────────────────────────────────┐
                       │             Visitors & Travelers             │
                       └──────────────────────┬───────────────────────┘
                                              │
                                              ▼
                             ┌─────────────────────────────────┐
                             │       Cloudflare / Route 53     │
                             │        (Free SSL & CDN)         │
                             └────────┬───────────────┬────────┘
                                      │               │
                     Frontend Requests│               │CMS API Requests
                                      ▼               ▼
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│  Comfort Journey Frontend Website    │     │   AWS Lightsail / EC2 Instance       │
│  (Static S3 / GitHub Pages / Vercel) │     │   - Directus 10 Node.js Engine       │
│  Domain: comfortjourneyy.com         │     │   - PostgreSQL 16 Database           │
└──────────────────────────────────────┘     │   - Redis Cache                      │
                                             │   Domain: cms.comfortjourneyy.com    │
                                             └──────────────────┬───────────────────┘
                                                                │
                                                Media & 3D Assets│
                                                                ▼
                                             ┌──────────────────────────────────────┐
                                             │       AWS S3 Storage Bucket          │
                                             │   (Images, Videos, PDFs, 3D Assets)  │
                                             └──────────────────────────────────────┘
```

---

## 3. Step-by-Step AWS Lightsail Deployment

### Step A: Create an AWS Lightsail Instance
1. Log in to the [AWS Lightsail Console](https://lightsail.aws.amazon.com/).
2. Click **Create instance**.
3. Choose location: **Asia Pacific (Mumbai) `ap-south-1`**.
4. Select platform: **Linux/Unix** -> Blueprint: **OS Only** -> **Ubuntu 22.04 LTS**.
5. Select instance plan: **$10/month (2 GB RAM, 2 vCPUs, 60 GB SSD, 3 TB transfer)**.
6. Set instance name: `comfort-journey-directus-cms`.
7. Click **Create instance**.

### Step B: Attach a Static IP & Open Firewall Ports
1. In Lightsail, go to **Networking** -> click **Create static IP** -> attach to `comfort-journey-directus-cms`.
2. Under instance **Networking** tab, add Firewall rules:
   - **Port 80 (HTTP)** - TCP - Any IPv4
   - **Port 443 (HTTPS)** - TCP - Any IPv4
   - **Port 8055 (Directus)** - TCP - Any IPv4 (or reverse proxy via Nginx on 443)

### Step C: Install Docker & Run Directus on Server
SSH into your instance and run:
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker & Docker Compose
sudo apt install -y docker.io docker-compose git

# Clone or upload your cms folder
mkdir -p /home/ubuntu/comfort-journey-cms
cd /home/ubuntu/comfort-journey-cms

# Create docker-compose.yml and .env from the templates in this repo
# Start the containers
sudo docker-compose up -d
```

### Step D: Free SSL Certificate with Nginx & Certbot
```bash
sudo apt install -y nginx certbot python3-certbot-nginx

# Configure Nginx reverse proxy for cms.comfortjourneyy.com -> localhost:8055
sudo certbot --nginx -d cms.comfortjourneyy.com
```

---

## 4. Setting Up AWS S3 Media Storage

1. Open the [AWS S3 Console](https://s3.console.aws.amazon.com/).
2. Create bucket: `comfort-journey-media-storage` (Region: `ap-south-1`).
3. Uncheck "Block all public access" for public images (or use CloudFront).
4. Create an IAM user `directus-s3-uploader` with `AmazonS3FullAccess`.
5. Add credentials to your `.env` file on the server:
   ```env
   STORAGE_LOCATIONS=s3
   STORAGE_S3_DRIVER=s3
   STORAGE_S3_KEY=AKIA...YOUR_ACCESS_KEY
   STORAGE_S3_SECRET=your_secret_key...
   STORAGE_S3_BUCKET=comfort-journey-media-storage
   STORAGE_S3_REGION=ap-south-1
   ```
6. Restart Directus: `sudo docker-compose restart directus`.

---

## 5. Itemized AWS Monthly Architecture Cost Breakdown

| Component | AWS Resource | Monthly Estimate |
|---|---|---|
| **Directus CMS App Server** | Lightsail 2 GB RAM, 2 vCPUs | **$10.00 / mo** |
| **PostgreSQL Database** | Embedded on Lightsail Docker | **$0.00 (Included)** |
| **S3 Media Storage** | AWS S3 Standard (~25 GB + Egress) | **$1.50 – $3.00 / mo** |
| **SSL & CDN Caching** | Cloudflare Free / Let's Encrypt | **$0.00 / mo** |
| **Frontend Static Hosting** | GitHub Pages / AWS S3 | **$0.00 – $1.00 / mo** |
| **Total Architecture Cost** | **Complete Live Stack** | **~$11.50 – $14.00 / month** |

---

## 6. Maintenance & Backup Checklist

- **Daily Database Backup:** Automated daily cron dumps database to S3:
  ```bash
  0 2 * * * docker exec comfort_journey_postgres pg_dump -U directus directus_comfort_journey | gzip > /home/ubuntu/backups/db_$(date +\%F).sql.gz
  ```
- **Zero Ongoing Code Maintenance:** Directus provides visual flows, role permissions, and content forms out of the box so non-developers can manage 100% of website content without developer intervention.
