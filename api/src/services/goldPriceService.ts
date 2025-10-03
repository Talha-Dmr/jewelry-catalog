import axios from 'axios';

const CACHE_WINDOW_MS = 5 * 60 * 1000;

let cachedPrice: { value: number; expiresAt: number } | null = null;

export async function getGoldPrice(): Promise<number> {
  const now = Date.now();
  if (cachedPrice && cachedPrice.expiresAt > now) {
    return cachedPrice.value;
  }

  const mocked = readMockedPrice();
  if (mocked !== null) {
    cachedPrice = {
      value: mocked,
      expiresAt: now + CACHE_WINDOW_MS
    };
    return mocked;
  }

  const url = process.env.GOLD_PRICE_API_URL;
  if (!url) {
    throw new Error('GOLD_PRICE_API_URL is not configured');
  }

  const response = await axios.get(url, {
    headers: buildAuthHeaders()
  });

  const price = extractPrice(response.data);
  if (!Number.isFinite(price)) {
    throw new Error('Gold price API response is missing a numeric price field');
  }

  cachedPrice = {
    value: price,
    expiresAt: now + CACHE_WINDOW_MS
  };

  return price;
}

function readMockedPrice(): number | null {
  const fallback = process.env.MOCK_GOLD_PRICE ?? process.env.GOLD_PRICE_FALLBACK;
  if (fallback === undefined) {
    return null;
  }

  const parsed = Number(fallback);
  return Number.isFinite(parsed) ? parsed : null;
}

function buildAuthHeaders(): Record<string, string> {
  if (!process.env.GOLD_PRICE_API_KEY) {
    return {};
  }

  const headerName = process.env.GOLD_PRICE_API_HEADER ?? 'X-API-KEY';
  return { [headerName]: process.env.GOLD_PRICE_API_KEY };
}

function extractPrice(payload: unknown): number {
  if (!payload || typeof payload !== 'object') {
    return NaN;
  }

  const obj = payload as Record<string, unknown> & {
    data?: Array<Record<string, unknown>>;
  };

  if (typeof obj.price === 'number') {
    return obj.price;
  }

  if (Array.isArray(obj.data)) {
    const first = obj.data[0];
    if (first && typeof first.price === 'number') {
      return first.price;
    }
  }

  if (Array.isArray(payload)) {
    const first = (payload as Array<Record<string, unknown>>)[0];
    if (first && typeof first.price === 'number') {
      return first.price;
    }
  }

  return NaN;
}
