# Jewelry Catalog Monorepo

This repository hosts a two-app monorepo for the Jewelry Catalog platform. The Express API under `api/` owns the product catalogue and pricing endpoints, while the Next.js UI in `web/` renders the storefront experience. Shared TypeScript contracts live in `packages/contracts/`, and supporting assets and documentation remain under `assets/` and `docs/` respectively.

## Project Structure

```
.
├── api/                  # Express service (REST API, gold price integration)
│   └── data/products.json
├── web/                  # Next.js storefront with Tailwind CSS
├── packages/
│   └── contracts/        # Shared DTOs and Zod schemas
├── assets/               # Fonts and brand assets
├── docs/                 # Reference PDFs and product collateral
├── .env.example          # Required environment variables for API + web
└── package.json          # npm workspaces entry point
```

## Prerequisites

- Node.js 20.x (LTS) and npm 10+
- Optional: `nvm` for managing Node versions

Copy environment variables before running locally:

```bash
cp .env.example .env
```

Update the gold price provider fields with valid credentials before production use.

## Install Dependencies

This repository uses npm workspaces. From the repo root:

```bash
npm install
```

This bootstraps dependencies for `api`, `web`, and `packages/contracts`. If you prefer to install within a single workspace, run `npm install` inside that package directory.

## Run Locally

| Purpose | Command |
| --- | --- |
| Express API with auto-reload | `cd api && npm run dev` |
| Next.js storefront | `cd web && npm run dev` |
| Root helper (web) | `npm run dev` |

### API Notes

- Serves on `http://localhost:4000` by default (configured in `api/src/server.ts`).
- `api/data/products.json` is the single source of truth for catalogue data.
- Gold price lookup uses `GOLD_PRICE_API_URL`/`GOLD_PRICE_API_KEY`; fallbacks to `MOCK_GOLD_PRICE` when the upstream provider is unavailable.

### Web App Notes

- Expects `NEXT_PUBLIC_API_BASE_URL` to point to the running API (defaults to `http://localhost:4000`).
- Carousel and UI primitives live under `web/lib/carousel` and `web/components` following the monorepo conventions.

## Testing & Linting

| Scope | Command |
| --- | --- |
| API Jest suite | `cd api && npm run test` |
| Web Vitest suite | `cd web && npm run test` |
| Lint (repo-wide) | `npm run lint` |

Testing targets include `GET /products`, filter behaviour, pricing utilities, UI snapshots, color picker image swaps, and popularity score rendering (0–5 scale with one decimal). Aim for ≥85% coverage on pricing utilities and state handlers.

## Deployment Checklist

1. Set environment variables in hosting dashboards (Render, Vercel, etc.).
2. Enable gold price response caching (5-minute TTL recommended) to respect provider rate limits.
3. Track large binaries with Git LFS and verify font licensing before adding new assets.
4. Document manual QA (devices tested, gold price source) in pull request descriptions.

## Conventional Commits & PRs

- Follow Conventional Commits, e.g. `feat(api): add price cache` or `feat(web): improve carousel responsiveness`.
- Each PR should include: summary, linked issue, relevant screenshots/recordings for UI updates, lint/test checklist, and gold price validation notes.
- Prefer squash merges to keep history linear.

Feel free to open an issue if anything in these instructions is missing or unclear.
