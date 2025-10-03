import React from 'react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductGallery from './ProductGallery';
import type { ProductWithPrice } from '@repo/contracts';

describe('ProductGallery', () => {
  const products: ProductWithPrice[] = Array.from({ length: 3 }, (_, index) => ({
    name: `Test Product ${index + 1}`,
    popularityScore: 0.6,
    popularityRating: 3,
    price: 150 + index,
    weight: 1.5 + index,
    images: {
      yellow: `https://example.com/${index}-yellow.jpg`
    }
  }));

  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn()
    }));
  });

  it('animates products with translate when navigating', async () => {
    render(<ProductGallery products={products} />);

    const track = screen.getByTestId('product-track');
    const nextButton = screen.getByLabelText('Show next products');

    expect(track).toHaveStyle({ transform: 'translateX(-0%)' });

    fireEvent.click(nextButton);

    await waitFor(() => {
      const transform = track.style.transform;
      const match = transform.match(/-([0-9.]+)%/);
      expect(match).not.toBeNull();
      const value = match ? Number.parseFloat(match[1]) : NaN;
      expect(value).toBeCloseTo((1 / products.length) * 100, 2);
    });
  });
});
