import type { NextFunction, Request, Response } from 'express';
import * as productsService from '../services/products.service';

/**
 * GET /api/products — list products (summaries for home).
 * Query seller_id optional: filter by seller for "productos del vendedor".
 */
export function list(req: Request, res: Response, next: NextFunction): void {
  try {
    const sellerId =
      typeof req.query['seller_id'] === 'string'
        ? req.query['seller_id'].trim()
        : undefined;
    const summaries = productsService.listProducts(sellerId);
    res.json(summaries);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/products/:productId — product detail by id.
 * Responds 404 when product not found.
 */
export function getById(req: Request, res: Response, next: NextFunction): void {
  const productId = req.params['productId'] ?? '';
  if (!productId.trim()) {
    res.status(400).json({ message: 'Invalid product id', code: 'INVALID_ID' });
    return;
  }
  try {
    const product = productsService.getProductById(productId);
    if (product === null) {
      res.status(404).json({ message: 'Product not found', code: 'NOT_FOUND' });
      return;
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
}
