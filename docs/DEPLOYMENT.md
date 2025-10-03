# Deployment Guide

This guide covers deploying the Jewelry Catalog monorepo using Render for the Express API and Vercel for the Next.js storefront.

## 1. Prerequisites

- GitHub repository connected to both Render and Vercel.
- Node.js 20.x locally.
- Valid credentials for the gold price provider (`GOLD_PRICE_API_URL`, `GOLD_PRICE_API_KEY`, `GOLD_PRICE_API_HEADER`).

## 2. Deploy the API on Render

Render can consume the `render.yaml` blueprint at the repo root. The service builds only the `api/` workspace while reusing the shared contracts package.

1. Log in to Render and select **New + → Blueprint**.
2. Point Render at this Git repository and select the `main` branch.
3. Confirm the generated service matches:
   - Type: `Web Service`
   - Environment: `Node`
   - Root Directory: `api`
   - Build Command:
     ```bash
     npm install
     npm run build
     ```
   - Start Command:
     ```bash
     npm run start
     ```
   - Health Check Path: `/health`
4. Under **Environment Variables**, add:
   - `NODE_VERSION=20`
   - `PORT=4000`
   - `MOCK_GOLD_PRICE=65.2` (optional fallback)
   - Secret values: `GOLD_PRICE_API_URL`, `GOLD_PRICE_API_KEY`, `GOLD_PRICE_API_HEADER`
5. Click **Apply**. Render will install dependencies, compile TypeScript, and start the service.
6. After the green deploy check, copy the public URL (e.g., `https://jewelry-catalog-api.onrender.com`). Make sure `/health` responds with `{ "status": "ok" }` and `/products` returns product data.

## 3. Deploy the Web App on Vercel

The Next.js storefront lives under `web/` with a local `vercel.json` describing build commands.

### 3.1 Create the project

1. Install the Vercel CLI if needed:
   ```bash
   npm install -g vercel
   ```
2. From the repository root, change into the web workspace:
   ```bash
   cd web
   ```
3. Authenticate and link the project:
   ```bash
   vercel login
   vercel link
   ```
   When prompted, choose **Set up and deploy → Import existing project** and confirm `web` as the root directory.

### 3.2 Configure environment variables

Set the production base URL for the API so the storefront fetches live data:

```bash
vercel env add NEXT_PUBLIC_API_BASE_URL production
```

Enter the Render API URL when prompted (e.g., `https://jewelry-catalog-api.onrender.com`). Repeat the command for the `preview` environment if you want deploy previews to hit staging endpoints.

### 3.3 Deploy

1. Trigger a preview build to validate the pipeline:
   ```bash
   vercel --prebuilt
   ```
   Vercel will run `npm install` and `npm run build` inside `web/`, then upload the `.next` output.
2. Promote to production:
   ```bash
   vercel --prod
   ```

### 3.4 Post-deploy checks

- Visit the production domain Vercel prints after the deploy finishes.
- Ensure the catalog renders and product images/rating stars load correctly.
- Validate the popularity score displays with one decimal (e.g., `4.3/5`).
- If the API URL changes, update the `NEXT_PUBLIC_API_BASE_URL` secret and re-deploy.

## 4. Automate via GitHub Integrations (optional)

- **Render**: Enable auto-deploy on push to `main` for the API service.
- **Vercel**: Link the GitHub repo and scope the project to `web/`; Vercel will build preview deployments for PRs by default. Ensure the preview environment inherits a safe API base URL (e.g., staging Render service).

## 5. Troubleshooting Tips

- API build failures typically stem from missing environment variables or a mismatched Node version—double-check `NODE_VERSION=20`.
- If Vercel fetches fail in production, confirm the API allows cross-origin requests; `cors()` is already enabled in `api/src/server.ts`.
- Use Render logs and `vercel logs` to inspect runtime errors quickly.
