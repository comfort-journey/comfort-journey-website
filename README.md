# Comfort Journey Website Optimization & Rebuild Guide

**Website:** [https://www.comfortjourneyy.com/](https://www.comfortjourneyy.com/)  
**Target:** PageSpeed Performance, UI/UX Elevation, Velo Integration, & Fast Rebuild.

---

## 📁 Directory Overview

* `velo/src/pages/Home.js` - Velo Page script for live counter, instant tour filter, and quick booking validation.
* `velo/src/backend/tours.jsw` - Velo Backend Web Module for querying tour collections & inserting enquiries into Wix Database.
* `velo/src/public/custom-widgets.html` - Custom HTML/CSS Floating Lead & WhatsApp button code for Wix Custom Code embeds.

---

## 🚀 Path 1: Wix Velo Local Development Setup

To sync these code files directly with your live Wix site using the official Wix CLI:

1. **Install Wix CLI globally (in terminal):**
   ```bash
   npm install -g @wix/cli
   ```
2. **Login and link your site:**
   ```bash
   wix login
   wix dev
   ```
3. **Copy Velo files:**
   * Copy `velo/src/pages/Home.js` to your Wix Page Velo Code.
   * Copy `velo/src/backend/tours.jsw` to your Wix Velo Backend folder.
   * Copy `velo/src/public/custom-widgets.html` to **Wix Settings -> Custom Code -> Body - End**.

---

## ⚡ Path 2: Ultra-Fast Custom Site (Next.js / Headless Wix)

When ready to transition from Wix Velo to a 95–100 PageSpeed custom web application:

1. We initialize Next.js / Vite in this repository.
2. We connect `@wix/sdk` to manage tour packages, bookings, and blog posts via Wix backend APIs.
3. Deploy to Vercel / Netlify for instant global loading.
