# Jewelry Catalog Monorepo

A full-stack jewelry product catalog featuring dynamic gold pricing, responsive design, and an interactive product carousel.

## 🚀 Quick Start

**1. Clone & Install**
```bash
git clone https://github.com/Talha-Dmr/jewelry-catalog.git
cd jewelry-catalog
npm install
```

**2. Run Backend API**
```bash
cd api
npm run dev
```
API will start at `http://localhost:4000`

**3. Run Frontend (in a new terminal)**
```bash
cd web
npm run dev
```
Web app will start at `http://localhost:3000`

**4. Open your browser**
Visit `http://localhost:3000` to see the catalog!

---

## 📁 Project Structure

```
.
├── api/                  # Express REST API (TypeScript + ESM)
│   ├── src/              # API source code
│   │   ├── server.ts     # Express server with /health & /products endpoints
│   │   ├── routes/       # API route handlers
│   │   ├── services/     # Business logic (gold price fetching, product service)
│   │   ├── repositories/ # Data access layer
│   │   └── utils/        # Pricing calculations
│   ├── data/products.json # Product catalog data
│   └── tests/            # Jest tests
├── web/                  # Next.js 14 storefront (TypeScript + Tailwind CSS)
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components (ProductCard, ProductGallery)
│   └── lib/              # Utility functions
├── packages/
│   └── contracts/        # Shared TypeScript types & Zod schemas
├── assets/               # Fonts and brand assets
└── docs/                 # Documentation & deployment guides
```

---

## ⚙️ Environment Variables

### API (api/.env)
```bash
# Optional: Gold price API credentials (falls back to mock price if not provided)
GOLD_PRICE_API_URL=https://your-gold-api.com
GOLD_PRICE_API_KEY=your-api-key
GOLD_PRICE_API_HEADER=Authorization

# Fallback mock price (used when API is unavailable)
MOCK_GOLD_PRICE=65.2

# Server port (default: 4000)
PORT=4000
```

### Web (web/.env)
```bash
# API endpoint (defaults to http://localhost:4000)
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

**Note:** Environment variables are optional for local development. The app works out-of-the-box with default values.

---

## 🧪 Testing & Linting

```bash
# Run API tests (Jest)
cd api && npm test

# Run Web tests (Vitest)
cd web && npm test

# Lint all code
npm run lint
```

---

## 🏗️ Build for Production

**Build API:**
```bash
cd api
npm run build    # Compiles TypeScript to dist/
npm start        # Runs compiled JS
```

**Build Web:**
```bash
cd web
npm run build    # Creates optimized Next.js build
npm start        # Serves production build
```

---

## 🌐 Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

**Quick Links:**
- **API:** Deploy to Render using `render.yaml`
- **Web:** Deploy to Vercel using `vercel.json`

**Environment Variables (Production):**
- API: Set `GOLD_PRICE_API_URL`, `GOLD_PRICE_API_KEY`, `NODE_VERSION=20`
- Web: Set `NEXT_PUBLIC_API_BASE_URL` to your API URL (e.g., `https://jewelry-catalog-api.onrender.com`)

---

## 📦 Key Features

- ✅ **Dynamic Pricing:** Real-time gold price integration with automatic calculation
- ✅ **Responsive Design:** Mobile-first UI with Tailwind CSS
- ✅ **Product Carousel:** Smooth navigation with arrow controls
- ✅ **Color Variants:** Interactive color picker for each product
- ✅ **Popularity Rating:** Visual star ratings (0-5 scale)
- ✅ **Type Safety:** Full TypeScript coverage with shared contracts
- ✅ **Testing:** Jest (API) + Vitest (Web) test suites
- ✅ **Health Checks:** `/health` endpoint for monitoring

---

## 🛠️ Tech Stack

**Backend:**
- Node.js 20 + Express
- TypeScript (ESM modules)
- Zod for validation
- Axios for HTTP requests
- Jest for testing

**Frontend:**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Vitest + Testing Library

**DevOps:**
- npm workspaces (monorepo)
- ESLint + Prettier
- Git conventional commits

---

## 📝 API Endpoints

**GET /health**
```json
{ "status": "ok" }
```

**GET /products**
```json
[
  {
    "name": "Elegant Ring",
    "price": 245.67,
    "weight": 2.5,
    "popularityScore": 0.85,
    "popularityRating": 4.3,
    "images": {
      "yellow": "url...",
      "white": "url...",
      "rose": "url..."
    }
  }
]
```

---

## 🤝 Contributing

Follow Conventional Commits:
- `feat(api): add caching layer`
- `fix(web): carousel navigation bug`
- `docs: update README`

---

## 📄 License

Private project - All rights reserved.
