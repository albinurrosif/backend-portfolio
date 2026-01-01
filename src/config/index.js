// config/index.js
import { connectMongo } from './connectMongo.js';

export async function initInfra() {
  if (process.env.NOTES_MONGO_URI) {
    await connectMongo(process.env.NOTES_MONGO_URI, 'Notes Mongo');
  }
}
