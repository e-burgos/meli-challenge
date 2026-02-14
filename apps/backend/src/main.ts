/**
 * Backend API — Products list and detail. See functional/specs/001-meli-prototype/plan.md.
 */

import { app } from './app';
import { logger } from './lib/logger';

const port = process.env.PORT ?? 3333;
const server = app.listen(port, () => {
  logger.info({ port }, `Listening at http://localhost:${port}/api`);
});
server.on('error', (err: Error) => logger.error({ err }, 'Server error'));
