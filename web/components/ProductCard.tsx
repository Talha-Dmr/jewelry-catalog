'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import type { ProductWithPrice } from '@repo/contracts';
import { formatRating, formatUsd } from '../lib/format.js';

const VARIANT_LABELS: Record<string, string> = {
  yellow: 'Yellow Gold',
  white: 'White Gold',
  rose: 'Rose Gold'
};

const VARIANT_COLORS: Record<string, string> = {
  yellow: '#E6CA97',
  white: '#D9D9D9',
  rose: '#E1A4A9'
};

interface ProductCardProps {
  product: ProductWithPrice;
}

export default function ProductCard({ product }: ProductCardProps) {
  const variants = Object.keys(product.images);
  const [selectedVariant, setSelectedVariant] = useState<string>(variants[0]);
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const activeImage = useMemo(() => {
    return product.images[selectedVariant] ?? product.images[variants[0]];
  }, [product.images, selectedVariant, variants]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    variants.forEach((variant) => {
      const src = product.images[variant];
      if (!src) {
        return;
      }
      const img = new window.Image();
      img.src = src;
    });
  }, [product.images, variants]);

  const rating = product.popularityRating;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const starKeyBase = useMemo(() => product.name.replace(/\s+/g, '-').toLowerCase(), [product.name]);
  const fullStarKeys = useMemo(
    () => Array.from({ length: fullStars }, (_, index) => `${starKeyBase}-full-${index}`),
    [fullStars, starKeyBase]
  );
  const emptyStarKeys = useMemo(
    () => Array.from({ length: emptyStars }, (_, index) => `${starKeyBase}-empty-${index}`),
    [emptyStars, starKeyBase]
  );

  return (
    <article className="flex flex-col gap-4 rounded-[32px] border border-[#ece9e6] bg-white p-6 shadow-[0_12px_24px_rgba(0,0,0,0.04)] transition hover:shadow-[0_16px_30px_rgba(0,0,0,0.08)]">
      <div className="relative overflow-hidden rounded-[28px] bg-[#f8f7f5]">
        <Image
          src={activeImage}
          alt={product.name}
          width={360}
          height={360}
          loading="lazy"
          className={`w-full object-cover transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[#1f1f1f]">{product.name}</h3>
          <p className="text-sm text-[#6f6b67]">{formatUsd(product.price)} USD</p>
        </div>

        <div className="flex items-center gap-2">
          {variants.map((variant) => {
            const isActive = variant === selectedVariant;
            const color = VARIANT_COLORS[variant] ?? '#d9d9d9';

            return (
              <button
                key={variant}
                type="button"
                onClick={() => {
                  if (variant === selectedVariant) {
                    return;
                  }
                  setIsImageLoaded(false);
                  setSelectedVariant(variant);
                }}
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  isActive ? 'border-[#1f1f1f]' : 'border-transparent'
                }`}
                aria-label={`Select ${variant} gold`}
              >
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)' }}
                />
              </button>
            );
          })}
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#8d8884]">
          {VARIANT_LABELS[selectedVariant] ?? selectedVariant}
        </span>
      </div>

      <div className="mt-auto flex items-center gap-3">
        <div className="flex items-center gap-1">
          {fullStarKeys.map((key) => (
            <StarIcon key={key} variant="full" />
          ))}
          {hasHalfStar && <StarIcon key={`${starKeyBase}-half`} variant="half" />}
          {emptyStarKeys.map((key) => (
            <StarIcon key={key} variant="empty" />
          ))}
        </div>
        <span className="text-sm text-[#6f6b67]">{formatRating(rating)}</span>
      </div>
    </article>
  );
}

function StarIcon({ variant }: { variant: 'full' | 'half' | 'empty' }) {
  const gradientId = React.useId();
  const baseFill = '#F5C16C';
  const emptyFill = '#E2DCD5';

  const fillProps =
    variant === 'half'
      ? { fill: `url(#${gradientId})` }
      : { fill: variant === 'full' ? baseFill : emptyFill };

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      {variant === 'half' ? (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="50%" stopColor={baseFill} />
            <stop offset="50%" stopColor={emptyFill} />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M12 2.5l2.8 6.12 6.7.6-5.1 4.6 1.5 6.58L12 16.94 6.1 20.4l1.5-6.58-5.1-4.6 6.7-.6z"
        {...fillProps}
        stroke="#d7d1ca"
        strokeWidth="0.6"
      />
    </svg>
  );
}
