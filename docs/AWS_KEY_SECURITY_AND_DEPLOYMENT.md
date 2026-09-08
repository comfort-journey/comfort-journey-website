# AWS Key Security & Production Deployment Guide
**Comfort Journey (Est. 1992 · Luxury Travel)**

This guide explains how to host the Comfort Journey website on **Amazon Web Services (AWS)** while keeping all API keys (such as `GEMINI_API_KEY`) **100% secure, encrypted at rest, and completely hidden from GitHub and client-side browsers**.

---

## Architecture Overview on AWS

```
               ┌────────────────────────────────────────────────────────┐
               │                  User Browser Client                   │
               └───────────────┬────────────────────────┬───────────────┘
                               │ (HTML / CSS / Assets)  │ (POST /api/ai-planner)
                               ▼                        ▼
               ┌────────────────────────┐      ┌────────────────────────┐
               │    AWS CloudFront      │      │    AWS CloudFront      │
               │   CDN Distribution     │      │   /api/* Path Route    │
               └───────────────┬────────┘      └────────┬───────────────┘
                               │                        │
                               ▼                        ▼
               ┌────────────────────────┐      ┌────────────────────────┐
               │     AWS S3 Bucket      │      │    AWS Lambda Function │
               │  (Static Website Build)│      │    (api/ai-planner.js) │
               │   *Zero Secrets Here*  │      └────────┬───────────────┘
               └────────────────────────┘               │
                                                        ▼ Reads via KMS
                                               ┌────────────────────────┐
                                               │ AWS Systems Manager /  │
                                               │ Lambda Encrypted Env   │
                                               │ [GEMINI_API_KEY] Vault │
                                               └────────────────────────┘
```

---

## Method 1: AWS Amplify (Easiest & Most Recommended)

If you are using **AWS Amplify Hosting**:

1. Log into your **AWS Management Console** and navigate to **AWS Amplify**.
2. Click **Host web app** $\rightarrow$ select **GitHub** $\rightarrow$ choose your repository (`comfort-journey-website`).
3. During setup or under **App Settings $\rightarrow$ Environment Variables**:
   - Click **Manage variables** $\rightarrow$ **Add variable**.
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: *(Paste your Gemini key from Google AI Studio)*
4. Click **Save and Deploy**.

> AWS Amplify automatically encrypts environment variables using **AWS KMS (Key Management Service)**. When your code builds and runs, only the backend serverless execution environment has access to this key. Your GitHub repo contains **no keys**.

---

## Method 2: AWS S3 + CloudFront + AWS Lambda (Enterprise Serverless)

If you host the static frontend on **S3 + CloudFront** and use a serverless backend for API routes:

### Step 1: Upload Static Frontend to S3
1. Run `npm run build` to generate the `/dist` directory.
2. Sync the `/dist` folder to your AWS S3 bucket:
   ```bash
   aws s3 sync ./dist s3://your-comfort-journey-bucket --delete
   ```

### Step 2: Create the AI Concierge AWS Lambda Function
1. In the AWS Console, open **AWS Lambda** $\rightarrow$ click **Create Function**:
   - **Function name**: `comfort-journey-ai-planner`
   - **Runtime**: `Node.js 20.x`
   - **Architecture**: `arm64` or `x86_64`
2. Upload the `api/ai-planner.js` code (handler is `ai-planner.lambdaHandler`).
3. Enable **Function URL**:
   - Under the function's **Configuration** $\rightarrow$ **Function URL** $\rightarrow$ click **Create Function URL**.
   - **Auth type**: `NONE` (protected by your CloudFront origin request header or CORS).
   - Configure CORS: allow your website domain (`https://yourdomain.com`).

### Step 3: Securely Store the Key in Lambda Environment Variables
1. Inside the Lambda function, go to **Configuration** $\rightarrow$ **Environment variables**.
2. Click **Edit** $\rightarrow$ **Add environment variable**:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: *(Your private key)*
3. Click **Save**.
   - AWS automatically encrypts this variable at rest using AWS Key Management Service (KMS).

*(Optional Enterprise Upgrade)*:
For banking-grade security, store the key in **AWS Systems Manager (SSM) Parameter Store**:
- Path: `/comfort-journey/production/GEMINI_API_KEY`
- Type: `SecureString` (KMS encrypted)
- Attach the `ssm:GetParameter` IAM policy to the Lambda execution role.

### Step 4: Route `/api/*` in AWS CloudFront
1. Open **AWS CloudFront** $\rightarrow$ select your distribution.
2. Under **Origins**, add the Lambda Function URL as an origin.
3. Under **Behaviors**, create a new behavior:
   - **Path Pattern**: `/api/*`
   - **Origin**: Select the Lambda origin.
   - **Allowed HTTP Methods**: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`.
   - **Cache Policy**: `CachingDisabled`.
   - **Origin Request Policy**: `AllViewerExceptHostHeader`.

---

## Method 3: AWS EC2 / Lightsail (Virtual Private Server)

If you are running on a virtual private server (EC2 instance or Amazon Lightsail):

1. SSH into your EC2/Lightsail instance:
   ```bash
   ssh -i your-key.pem ubuntu@your-server-ip
   ```
2. Create an isolated `.env` file directly on the server file system:
   ```bash
   nano /var/www/comfort-journey/.env
   ```
   Add:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```
3. Set strict file permissions so only the web process user can read it:
   ```bash
   chmod 600 /var/www/comfort-journey/.env
   ```
4. This file lives **only on the AWS server** and is never added to Git.

---

## Summary Checklist

- [x] **No Keys in Git**: `.gitignore` strictly ignores `.env` and `.env.*`.
- [x] **No Keys in Client JS**: The browser code only makes a POST request to `/api/ai-planner`.
- [x] **Encrypted in AWS**: The key is stored in AWS Amplify / Lambda Environment Variables encrypted by **AWS KMS**.
- [x] **Fallback Protection**: If the key is ever missing or rotated, the website automatically falls back to the embedded Comfort Journey knowledge engine without throwing an error.
