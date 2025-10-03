import { ProductListFilters, ProductWithPrice } from '@repo/contracts/product';
import { getProducts } from '../repositories/productRepository';
import { getGoldPrice } from './goldPriceService';
import { calculateProductPrice, convertPopularityToRating } from '../utils/pricing';

export async function listProducts(filters: ProductListFilters = {}): Promise<ProductWithPrice[]> {
  const [products, goldPrice] = await Promise.all([
    getProducts(),
    getGoldPrice()
  ]);

  const enriched = products.map((product) => ({
    ...product,
    price: calculateProductPrice(product, goldPrice),
    popularityRating: convertPopularityToRating(product.popularityScore)
  }));

  return enriched.filter((product) => matchesFilters(product, filters));
}

function matchesFilters(product: ProductWithPrice, filters: ProductListFilters): boolean {
  if (typeof filters.minPopularity === 'number' && product.popularityScore < filters.minPopularity) {
    return false;
  }

  if (typeof filters.minPrice === 'number' && product.price < filters.minPrice) {
    return false;
  }

  if (typeof filters.maxPrice === 'number' && product.price > filters.maxPrice) {
    return false;
  }

  return true;
}
