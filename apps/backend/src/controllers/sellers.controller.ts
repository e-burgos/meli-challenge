import type { NextFunction, Request, Response } from 'express';
import * as sellersService from '../services/sellers.service';

/**
 * GET /api/sellers — list all sellers.
 */
export function list(_req: Request, res: Response, next: NextFunction): void {
  try {
    const sellers = sellersService.listSellers();
    res.json(sellers);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/sellers/:sellerId — seller detail by id.
 * Responds 404 when seller not found.
 */
export function getById(req: Request, res: Response, next: NextFunction): void {
  const sellerId = req.params['sellerId'] ?? '';
  if (sellerId.trim() === '') {
    res.status(400).json({ message: 'Invalid seller id', code: 'INVALID_ID' });
    return;
  }
  try {
    const seller = sellersService.getSellerById(sellerId);
    if (seller === null) {
      res.status(404).json({ message: 'Seller not found', code: 'NOT_FOUND' });
      return;
    }
    res.json(seller);
  } catch (err) {
    next(err);
  }
}
