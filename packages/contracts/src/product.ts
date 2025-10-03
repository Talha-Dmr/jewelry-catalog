export interface ProductImageMap {
  [variant: string]: string;
}

export interface ProductRecord {
  name: string;
  popularityScore: number; // 0-1 scale
  weight: number; // grams
  images: ProductImageMap;
}

export interface ProductWithPrice extends ProductRecord {
  price: number; // USD
  popularityRating: number; // 0-5 scale with one decimal place
}

export interface ProductListFilters {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number; // expects 0-1 scale
}

export interface ProductListResponse {
  items: ProductWithPrice[];
}
