import { Router } from 'express';
import { ZodError, z } from 'zod';
import { listProducts } from '../services/productService';

const router = Router();

const filtersSchema = z
  .object({
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    minPopularity: z.coerce.number().min(0).max(1).optional()
  })
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: 'minPrice must be less than or equal to maxPrice',
      path: ['minPrice']
    }
  );

router.get('/', async (req, res, next) => {
  try {
    const filters = filtersSchema.parse(req.query);
    const products = await listProducts(filters);
    res.json({ items: products });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'Invalid query parameters',
        issues: error.issues
      });
      return;
    }
    next(error);
  }
});

export default router;
