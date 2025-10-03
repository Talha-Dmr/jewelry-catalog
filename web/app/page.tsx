import { Suspense } from 'react';
import ProductGallery from '../components/ProductGallery';
import type { ProductWithPrice } from '@repo/contracts';

async function fetchProducts(): Promise<ProductWithPrice[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';
  const response = await fetch(`${baseUrl}/products`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to load products from API');
  }

  const payload = (await response.json()) as { items: ProductWithPrice[] };
  return payload.items;
}

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-24 pt-16 md:px-12">
      <Suspense fallback={<p className="text-sm text-[#8d8884]">Loading products…</p>}>
        <ProductGallery products={products} />
      </Suspense>
    </main>
  );
}
