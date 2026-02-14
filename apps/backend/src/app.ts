/**
 * Express app — configured for API (products, sellers, OpenAPI).
 * Exported for integration tests; main.ts imports and calls app.listen().
 */

import cors from 'cors';
import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';
import { logger } from './lib/logger';
import { requestLogger } from './lib/request-logger';
import { productsRoutes } from './routes/products.routes';
import { sellersRoutes } from './routes/sellers.routes';

/** Simulated network delay (ms) for API responses; skipped when NODE_ENV=test. */
const API_DELAY_MS = 2000;

export const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api', (req, res, next) => {
  if (process.env.NODE_ENV === 'test') return next();
  if (req.path === '/openapi.yaml' || req.path.startsWith('/docs')) return next();
  setTimeout(() => next(), API_DELAY_MS);
});

const openApiPath = path.join(__dirname, 'openapi', 'openapi.yaml');
app.get('/api/openapi.yaml', (_req, res) => {
  res.type('application/x-yaml');
  res.sendFile(openApiPath, (err) => {
    if (err) {
      res.status(500).send('OpenAPI spec not found');
    }
  });
});

const swaggerUiOpts = { swaggerOptions: { url: '/api/openapi.yaml' } };
const [swaggerInitMiddleware] = swaggerUi.serveFiles(null, swaggerUiOpts);
app.use(
  '/api/docs',
  express.static(path.join(__dirname, 'swagger-ui'), { index: false }),
  swaggerInitMiddleware,
  swaggerUi.setup(null, swaggerUiOpts)
);

app.get('/api', (_req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.use('/api/products', productsRoutes);
app.use('/api/sellers', sellersRoutes);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  void next;
  logger.error({ err }, err.message ?? 'Internal server error');
  res.status(500).json({ message: err.message ?? 'Internal server error', code: 'INTERNAL_ERROR' });
});
