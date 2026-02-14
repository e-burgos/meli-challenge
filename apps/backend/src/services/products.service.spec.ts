/**
 * T017, T025: Tests for products service — listProducts and getProductById.
 * Given mocks in apps/backend/src/data/*.json, listProducts returns array;
 * getProductById(id) returns product or null when not found.
 */

import * as fs from 'fs';
import * as sellersService from './sellers.service';
import { getProductById, listProducts } from './products.service';

const mockProductsJson = JSON.stringify([
  {
    id: 'TEST001',
    seller_id: 'SELLER001',
    title: 'Test Product',
    description: 'Test description',
    price: 99999,
    currency_id: 'ARS',
    images: ['https://example.com/1.jpg'],
    payment_methods: ['Mercado Pago'],
    condition: 'Nuevo',
    stock: 5,
    sold_quantity: 10,
    installments: { quantity: 6, amount: 16666.5 },
    highlights: ['Highlight 1'],
    warranty: '12 meses',
    return_policy: 'Devolución gratis',
    fulfillment_type: 'FULL',
    shipping: { free_shipping: true, label: 'Envío gratis' },
    other_offers_count: 2,
    other_offers_min_price: 89999,
  },
  {
    id: 'TEST002',
    seller_id: 'SELLER001',
    title: 'Another Product',
    price: 49999,
    currency_id: 'ARS',
    images: [],
    condition: 'Nuevo',
  },
]);

const mockSeller = {
  id: 'SELLER001',
  nickname: 'Test Seller',
  badge: 'MercadoLíder',
  sales_count: 100,
  followers_count: 50,
  product_count: 10,
  attention_rating: 'Buena atención',
  delivery_rating: 'Entrega a tiempo',
};

jest.mock('fs');
jest.mock('./sellers.service', () => ({
  getSellerById: jest.fn(),
}));

describe('products.service', () => {
  const readFileSync = fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>;
  const getSellerByIdMock = sellersService.getSellerById as jest.MockedFunction<
    typeof sellersService.getSellerById
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    readFileSync.mockReturnValue(mockProductsJson);
    getSellerByIdMock.mockReturnValue(mockSeller);
  });

  describe('listProducts (T017)', () => {
    it('returns an array of product summaries', () => {
      const result = listProducts();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
    });

    it('each summary has id, title, price and expected fields', () => {
      const result = listProducts();
      for (const item of result) {
        expect(item).toHaveProperty('id');
        expect(typeof item.id).toBe('string');
        expect(item).toHaveProperty('title');
        expect(typeof item.title).toBe('string');
        expect(item).toHaveProperty('price');
        expect(typeof item.price).toBe('number');
        expect(item).toHaveProperty('seller_id');
      }
    });

    it('filters by seller_id when provided', () => {
      const result = listProducts('SELLER001');
      expect(result.length).toBe(2);
      expect(result.every((p) => p.seller_id === 'SELLER001')).toBe(true);
    });

    it('returns empty array when seller_id matches no products', () => {
      const result = listProducts('OTHER_SELLER');
      expect(result).toEqual([]);
    });
  });

  describe('getProductById (T025)', () => {
    it('returns product detail when id exists', () => {
      const result = getProductById('TEST001');
      expect(result).not.toBeNull();
      expect(result?.id).toBe('TEST001');
      expect(result?.title).toBe('Test Product');
      expect(result?.price).toBe(99999);
      expect(result?.seller).toEqual(mockSeller);
      expect(result?.images).toEqual(['https://example.com/1.jpg']);
    });

    it('returns null when id does not exist', () => {
      const result = getProductById('NONEXISTENT');
      expect(result).toBeNull();
    });

    it('resolves seller via getSellerById', () => {
      getProductById('TEST001');
      expect(getSellerByIdMock).toHaveBeenCalledWith('SELLER001');
    });
  });
});
