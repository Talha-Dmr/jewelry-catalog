export const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export function formatUsd(value: number, minimumFractionDigits = 2) {
  return usdFormatter.format(parseFloat(value.toFixed(minimumFractionDigits)));
}

export function formatRating(rating: number) {
  return `${rating.toFixed(1)}/5`;
}
