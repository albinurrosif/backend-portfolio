// src/shared/middlewares/rateLimiter.js
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export function createRateLimiter({ enabled, redisUrl, redisToken, limit = 100, window = '60 s' }) {
  if (!enabled) {
    return (req, res, next) => next();
  }

  if (!redisUrl || !redisToken) {
    console.warn('[RateLimiter] disabled: redis env missing');
    return (req, res, next) => next();
  }

  const redis = new Redis({ url: redisUrl, token: redisToken });
  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
  });

  return async (req, res, next) => {
    const { success } = await ratelimit.limit(req.ip);
    if (!success) {
      return res.status(429).json({ message: 'Too many requests' });
    }
    next();
  };
}
