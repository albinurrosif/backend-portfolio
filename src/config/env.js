// src/config/env.js
import 'dotenv/config';

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: process.env.PORT ?? 5001,

  NOTES_MONGO_URI: process.env.NOTES_MONGO_URI,

  REDIS_URL: process.env.NOTES_UPSTASH_REDIS_REST_URL,
  REDIS_TOKEN: process.env.NOTES_UPSTASH_REDIS_REST_TOKEN,

  ENABLE_RATE_LIMIT: process.env.ENABLE_RATE_LIMIT === 'true',
};
