# Repository Guidelines

## Project Structure & Module Organization
Adopt a two-app monorepo: `api/` for the Express service, `web/` for the Next.js UI, `packages/contracts/` for shared TypeScript types, `assets/` for existing fonts, and `docs/` for the supplied PDFs. Move `products.json` into `api/data/products.json` so the backend owns the catalogue source. Within `web/`, keep UI primitives in `components/`, hooks in `lib/hooks/`, and carousel helpers under `lib/carousel/`. Co-locate specs beside code (`ProductCard.test.tsx`) to simplify maintenance.

## Build, Test & Development Commands
- `cd api && npm install && npm run dev` — runs the REST API with Nodemon hot reload.
- `cd api && npm run test` — executes Jest suites for pricing math and filter endpoints.
- `cd web && npm install && npm run dev` — starts the Next.js dev server with Tailwind.
- `cd web && npm run test` — runs Vitest component tests in jsdom.
- `npm run lint` (repo root) — invokes ESLint + Prettier across all packages.

## Coding Style & Naming Conventions
Use TypeScript everywhere, two-space indentation, trailing commas, and camelCase identifiers. React components and DTO classes use PascalCase; API routes and files stay lowercase-kebab (`products.ts`). Keep JSON fields camelCase (`popularityScore`, `imageUrls`). Configure Prettier, ESLint, and EditorConfig in the repo root and enforce them via pre-commit hooks.

## Testing Guidelines
Backend tests must validate `GET /products`, gold price retrieval fallbacks, and optional filters (price range, popularity). Frontend suites should snapshot the product grid, confirm color picker swaps images, and ensure the popularity score renders as a 0–5 rating with one decimal (`4.3/5`). Target ≥85% coverage on pricing utilities and UI state handlers. Record manual QA steps—devices checked and gold price source—in each PR description.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat(api):`, `feat(web):`, `chore:`) and keep scope atomic. Every PR needs a summary, linked issue, screenshots or recordings for UI updates, and a checklist confirming lint, tests, and gold-price validation. Request at least one reviewer and prefer squash merges so the history stays linear.

## Deployment & Security Notes
Document required env vars in `.env.example` (`GOLD_PRICE_API_URL`, `GOLD_PRICE_API_KEY`, `NEXT_PUBLIC_API_BASE_URL`). Store secrets in host dashboards (Render, Vercel) and cache gold price responses for five minutes to respect rate limits. Track large binaries with Git LFS and verify font licensing before committing additional assets.
