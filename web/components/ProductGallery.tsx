'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { ProductWithPrice } from '@repo/contracts';
import ProductCard from './ProductCard.js';

interface ProductGalleryProps {
  products: ProductWithPrice[];
}

const VISIBLE_COUNT_DESKTOP = 4;
const DESKTOP_BREAKPOINT = 768;

export default function ProductGallery({ products }: ProductGalleryProps) {
  const total = products.length;
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);

    const updateItemsPerView = () => {
      const baseCount = mediaQuery.matches ? VISIBLE_COUNT_DESKTOP : 1;
      const safeTotal = Math.max(total, 1);
      setItemsPerView(Math.min(baseCount, safeTotal));
    };

    updateItemsPerView();

    const listener = () => updateItemsPerView();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener);
    } else {
      mediaQuery.addListener(listener);
    }

    window.addEventListener('resize', listener);

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', listener);
      } else {
        mediaQuery.removeListener(listener);
      }

      window.removeEventListener('resize', listener);
    };
  }, [total]);

  const maxIndex = Math.max(total - itemsPerView, 0);

  useEffect(() => {
    setStartIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const itemWidth = useMemo(() => (itemsPerView > 0 ? 100 / itemsPerView : 100), [itemsPerView]);
  const offsetPercentage = useMemo(() => {
    if (total === 0) {
      return 0;
    }

    return (startIndex / total) * 100;
  }, [startIndex, total]);

  const legendItems = useMemo(
    () => [
      { color: '#E6CA97', label: 'Yellow Gold (#E6CA97)' },
      { color: '#D9D9D9', label: 'White Gold (#D9D9D9)' },
      { color: '#E1A4A9', label: 'Rose Gold (#E1A4A9)' }
    ],
    []
  );

  if (!total) {
    return <p className="text-sm text-neutral-500">No products available yet.</p>;
  }

  const handlePrev = () => {
    setStartIndex((current) => Math.max(0, current - 1));
  };

  const handleNext = () => {
    setStartIndex((current) => Math.min(maxIndex, current + 1));
  };

  const sections = maxIndex + 1;
  const indicatorWidth = 1 / sections;
  const indicatorOffset = maxIndex === 0 ? 0 : (startIndex / maxIndex) * (1 - indicatorWidth);

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex === maxIndex;

  return (
    <section className="relative flex w-full flex-col gap-10">
      <header className="flex items-center justify-center gap-6">
        <div className="h-px w-16 bg-[#c6c2bd]" aria-hidden />
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-3xl font-normal tracking-wide text-[#1c1c1c]">Product List</h2>
          <span className="text-xs uppercase tracking-[0.45em] text-[#a8a4a1]">Avenir · Book · 45</span>
        </div>
        <div className="h-px w-16 bg-[#c6c2bd]" aria-hidden />
      </header>

      <div className="relative">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Show previous products"
          disabled={isPrevDisabled}
          className={`absolute left-[-2.5rem] top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9d6d1] bg-white text-2xl transition md:flex ${
            isPrevDisabled ? 'cursor-not-allowed opacity-40' : 'text-[#7a756f] hover:border-[#b3ada6] hover:text-[#3f3c38]'
          }`}
        >
          ‹
        </button>
        <div className="overflow-hidden">
          <div
            data-testid="product-track"
            className="-mx-2 flex transition-transform duration-500 ease-out md:-mx-4"
            style={{ transform: `translateX(-${offsetPercentage}%)` }}
          >
            {products.map((product) => (
              <div
                key={`${product.name}-${product.weight}`}
                className="w-full shrink-0 grow-0 px-2 md:px-4"
                style={{ flexBasis: `${itemWidth}%`, maxWidth: `${itemWidth}%` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Show next products"
          disabled={isNextDisabled}
          className={`absolute right-[-2.5rem] top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9d6d1] bg-white text-2xl transition md:flex ${
            isNextDisabled ? 'cursor-not-allowed opacity-40' : 'text-[#7a756f] hover:border-[#b3ada6] hover:text-[#3f3c38]'
          }`}
        >
          ›
        </button>
      </div>

      <div className="mx-auto h-2 w-full max-w-4xl rounded-full bg-[#d9d6d1]">
        <div
          className="h-full rounded-full bg-[#b3ada6] transition-all"
          style={{
            width: `${indicatorWidth * 100}%`,
            marginLeft: `${indicatorOffset * 100}%`
          }}
        />
      </div>

      <div className="mt-6 grid gap-2 text-xs text-[#8d8884] md:absolute md:right-0 md:top-full md:mt-6 md:text-right">
        <span className="font-semibold uppercase tracking-[0.35em] text-[#b9b4ae]">Click</span>
        {legendItems.map((item) => (
          <div key={item.label} className="ml-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
