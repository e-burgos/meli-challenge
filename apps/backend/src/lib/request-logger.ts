import type { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

/**
 * Request logging middleware. Logs every incoming request (method, path, query)
 * and on response finish logs status and duration. Structured for JSON output.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  logger.info(
    {
      event: 'request_start',
      method: req.method,
      path: req.path,
      url: req.originalUrl,
      query: Object.keys(req.query).length > 0 ? req.query : undefined,
    },
    `→ ${req.method} ${req.originalUrl}`
  );

  res.on('finish', () => {
    const durationMs = Date.now() - start;
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    logger[level](
      {
        event: 'request_complete',
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs,
      },
      `← ${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`
    );
  });

  next();
}
