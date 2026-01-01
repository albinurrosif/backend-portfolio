import express from 'express';
import cors from './middlewares/cors.js';

import notesRoutes from './apps/notesApp/routes/index.js';
import { env } from './config/env.js';
import { createRateLimiter } from './shared/middlewares/createRateLimiter.js';

export function createApp() {
  const app = express();

  app.use(cors);

  app.use(express.json());

  app.use('/api/notes', createRateLimiter({
    enabled: env.ENABLE_RATE_LIMIT,
    redisUrl: env.REDIS_URL,
    redisToken: env.REDIS_TOKEN,
    limit: 50,
  }), notesRoutes);

  return app;
}
