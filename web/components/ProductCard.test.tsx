import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import type { ProductWithPrice } from '@repo/contracts/product';

const product: ProductWithPrice = {
  name: 'Test Ring',
  popularityScore: 0.9,
  popularityRating: 4.5,
  price: 450,
  weight: 2.2,
  images: {
    yellow: 'https://cdn.shopify.com/test-yellow.jpg',
    white: 'https://cdn.shopify.com/test-white.jpg'
  }
};

describe('ProductCard', () => {
  it('renders product details', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText('Test Ring')).toBeInTheDocument();
    expect(screen.getByText('$450.00 USD')).toBeInTheDocument();
    expect(screen.getByText('4.5/5')).toBeInTheDocument();
  });
});
