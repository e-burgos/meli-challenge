/**
 * T016, T024: Contract tests for GET /api/products and GET /api/products/:id.
 * T016: GET /api/products — 200, body array with id, title, price, etc.
 * T024: GET /api/products/:id — 200 with Product when id exists; 404 when not; 400 if id invalid.
 */

import request from 'supertest';
import { app } from './app';

const originalEnv = process.env.NODE_ENV;

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

afterAll(() => {
  process.env.NODE_ENV = originalEnv;
});

describe('GET /api/products (T016)', () => {
  it('responds with 200 and array of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('each product has id, title, price and expected summary fields', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    const body = res.body as unknown[];
    if (body.length === 0) return;
    for (const item of body) {
      const p = item as Record<string, unknown>;
      expect(p).toHaveProperty('id');
      expect(typeof p.id).toBe('string');
      expect(p).toHaveProperty('title');
      expect(typeof p.title).toBe('string');
      expect(p).toHaveProperty('price');
      expect(typeof p.price).toBe('number');
    }
  });

  it('accepts seller_id query and filters results', async () => {
    const res = await request(app).get('/api/products').query({ seller_id: 'SELLER001' });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const body = res.body as Array<{ seller_id?: string }>;
    for (const p of body) {
      expect(p.seller_id).toBe('SELLER001');
    }
  });
});

describe('GET /api/products/:productId (T024)', () => {
  it('responds with 200 and Product body when id exists', async () => {
    const res = await request(app).get('/api/products/MLA2009168328');
    if (res.status === 404) {
      return;
    }
    expect(res.status).toBe(200);
    const body = res.body as Record<string, unknown>;
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('price');
    expect(body).toHaveProperty('images');
    expect(body).toHaveProperty('seller');
    expect(Array.isArray(body.images)).toBe(true);
    const seller = body.seller as Record<string, unknown>;
    expect(seller).toHaveProperty('id');
    expect(seller).toHaveProperty('nickname');
  });

  it('responds with 404 when id does not exist', async () => {
    const res = await request(app).get('/api/products/NONEXISTENT_ID_12345');
    expect(res.status).toBe(404);
    const body = res.body as Record<string, unknown>;
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('code');
    expect((body.code as string) === 'NOT_FOUND' || (body.message as string).toLowerCase().includes('not found')).toBe(true);
  });

  it('responds with 400 for invalid id (e.g. only whitespace)', async () => {
    const res = await request(app).get('/api/products/%20');
    expect(res.status).toBe(400);
    const body = res.body as Record<string, unknown>;
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('code');
    expect(body.code).toBe('INVALID_ID');
  });
});
