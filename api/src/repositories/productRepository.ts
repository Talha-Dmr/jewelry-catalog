import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { ProductRecord } from '@repo/contracts';

const dataPath = path.resolve(process.cwd(), 'data/products.json');

export async function getProducts(): Promise<ProductRecord[]> {
  const raw = await readFile(dataPath, 'utf-8');
  const parsed = JSON.parse(raw) as ProductRecord[];
  return parsed;
}
