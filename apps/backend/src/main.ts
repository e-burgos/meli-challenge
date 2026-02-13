/**
 * Backend API — Products list and detail. See functional/specs/001-meli-prototype/plan.md.
 */

import cors from 'cors';
import express, { type Request, type Response, type NextFunction } from 'express';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';
import { logger } from './lib/logger';
import { requestLogger } from './lib/request-logger';
import { productsRoutes } from './routes/products.routes';
import { sellersRoutes } from './routes/sellers.routes';

/** Simulated network delay (ms) for API responses so they feel realistic. */
const API_DELAY_MS = 2000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Delay API responses (skip for OpenAPI spec and Swagger UI)
app.use('/api', (req, res, next) => {
  if (req.path === '/openapi.yaml' || req.path.startsWith('/docs')) return next();
  setTimeout(() => next(), API_DELAY_MS);
});

// OpenAPI spec: served from backend project (copied to dist/openapi at build time)
const openApiPath = path.join(__dirname, 'openapi', 'openapi.yaml');
app.get('/api/openapi.yaml', (_req, res) => {
  res.type('application/x-yaml');
  res.sendFile(openApiPath, (err) => {
    if (err) {
      res.status(500).send('OpenAPI spec not found');
    }
  });
});

// Swagger UI: serve static assets from dist/swagger-ui (copied at build time)
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

// Global error handler (4-arg middleware; _next required for Express to recognize it)
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  void next; // required in signature, not called when sending response
  logger.error({ err }, err.message ?? 'Internal server error');
  res.status(500).json({ message: err.message ?? 'Internal server error', code: 'INTERNAL_ERROR' });
});

const port = process.env.PORT ?? 3333;
const server = app.listen(port, () => {
  logger.info({ port }, `Listening at http://localhost:${port}/api`);
});
server.on('error', (err: Error) => logger.error({ err }, 'Server error'));
