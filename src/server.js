// server.js
import dotenv from 'dotenv';
import { initInfra } from './config/index.js';
import { createApp } from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

await initInfra();

const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
