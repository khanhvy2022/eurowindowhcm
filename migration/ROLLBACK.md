# SEO Migration Rollback Plan: eurowindowhcm.com

## Emergency Rollback Triggers
Execute this rollback plan immediately if any of the following critical conditions are detected within 72 hours post-cutover:
1. **Redirect Failure Spike**: More than 5% of legacy URLs returning 404/500 errors on production.
2. **Organic Traffic Collapse**: More than 40% organic impressions drop not attributable to normal Google re-indexing lag.
3. **Core Vercel Outage**: Unresolvable infrastructure failure preventing domain resolution.

---

## Step 1: DNS & Domain Routing Reversion
1. Log in to Domain Registrar / DNS Manager (Cloudflare / Namecheap / PA Vietnam / etc.).
2. Restore Blogger DNS records:
   - **CNAME (www)**: Point `www.eurowindowhcm.com` back to `ghs.google.com`.
   - **A Records (@)**:
     - `216.239.32.21`
     - `216.239.34.21`
     - `216.239.36.21`
     - `216.239.38.21`
   - **Google Verification CNAME**: Ensure the custom security verification token CNAME for Blogger is active.
3. Set DNS TTL to 300s (5 minutes) for rapid propagation.

---

## Step 2: Blogger Custom Domain Restoration
1. Access Google Blogger Admin: `https://www.blogger.com/`.
2. Navigate to **Settings** > **Publishing** > **Custom Domain**.
3. Re-verify `www.eurowindowhcm.com` and toggle **Redirect domain** (`eurowindowhcm.com` to `www.eurowindowhcm.com`).
4. Toggle **HTTPS Availability** and **HTTPS Redirect** to **ON**.

---

## Step 3: Next.js & Vercel Rollback
1. If the issue is software-related within Next.js:
   - In Vercel Dashboard, go to **Deployments**.
   - Locate the previous stable Instant Deployment snapshot.
   - Click **Instant Rollback**.
2. If reverting to Blogger entirely, remove the production domain from Vercel domain settings to prevent certificate conflicts.

---

## Step 4: Verification & Smoke Testing
Run the automated verification suite against the reverted domain:
```bash
node migration/scripts/verify-redirects.mjs
```
1. Verify `https://www.eurowindowhcm.com/` loads with Blogger theme and status 200.
2. Verify legacy URLs like `https://www.eurowindowhcm.com/2026/07/kham-pha-quy-trinh-khat-khe-ang-sau-su.html` return status 200.
3. Verify `https://www.eurowindowhcm.com/sitemap.xml` returns valid XML.
4. Verify `https://www.eurowindowhcm.com/robots.txt` is intact.

---

## Step 5: Post-Rollback Post-Mortem
1. Record incident timestamp, duration, root cause, and impacted URLs in `migration/post-migration-report.md`.
2. Notify stakeholders and re-queue migration after root-cause rectification.
