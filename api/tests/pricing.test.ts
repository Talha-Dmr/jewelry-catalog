import type { ProductRecord } from '@repo/contracts/product';
import { calculateProductPrice, convertPopularityToRating } from '../src/utils/pricing';

describe('pricing utils', () => {
  it('calculates price using provided formula and rounds to cents', () => {
    const product: ProductRecord = {
      name: 'Test Product',
      popularityScore: 0.85,
      weight: 2.1,
      images: {
        yellow: 'https://example.com/yellow.jpg'
      }
    };
    const price = calculateProductPrice(product, 75);
    expect(price).toBe(291.38);
  });

  it('converts popularity score to a 0-5 rating with one decimal place', () => {
    const rating = convertPopularityToRating(0.88);
    expect(rating).toBe(4.4);
  });
});
