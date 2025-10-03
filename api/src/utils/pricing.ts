import { ProductRecord } from '@repo/contracts/product';

const POPULARITY_SCALE = 5;

export function calculateProductPrice(product: ProductRecord, goldPrice: number): number {
  const price = (product.popularityScore + 1) * product.weight * goldPrice;
  return Math.round(price * 100) / 100;
}

export function convertPopularityToRating(popularity: number): number {
  const rating = popularity * POPULARITY_SCALE;
  return Math.round(rating * 10) / 10;
}
