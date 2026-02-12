/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

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

// Swagger UI: serve static assets from dist/swagger-ui (copied at build time);
// init script and HTML from swagger-ui-express (bundled path to node_modules fails when bundled).
const swaggerUiOpts = { swaggerOptions: { url: '/api/openapi.yaml' } };
const [swaggerInitMiddleware] = swaggerUi.serveFiles(null, swaggerUiOpts);
app.use(
  '/api/docs',
  express.static(path.join(__dirname, 'swagger-ui'), { index: false }),
  swaggerInitMiddleware,
  swaggerUi.setup(null, swaggerUiOpts)
);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
