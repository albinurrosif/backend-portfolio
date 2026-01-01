// server.js
import dotenv from 'dotenv';
import { initInfra } from './config/index.js';
import { createApp } from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

await initInfra();

const app = createApp();

console.log('REDIS URL:', process.env.NOTES_UPSTASH_REDIS_REST_URL);
console.log('REDIS TOKEN:', process.env.NOTES_UPSTASH_REDIS_REST_TOKEN?.slice(0, 10));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
