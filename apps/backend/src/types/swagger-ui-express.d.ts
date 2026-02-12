declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';
  const serve: RequestHandler[];
  function setup(
    swaggerDoc?: unknown,
    options?: { swaggerOptions?: { url?: string } }
  ): RequestHandler;
  function serveFiles(
    swaggerDoc: null,
    opts: { swaggerOptions?: { url?: string } }
  ): RequestHandler[];
}
