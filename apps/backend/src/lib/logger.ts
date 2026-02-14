import pino from 'pino';

/**
 * Backend logger. Log level via LOG_LEVEL (default: info). Output is JSON lines.
 */
export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
});
