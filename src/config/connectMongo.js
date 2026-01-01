import mongoose from 'mongoose';

export async function connectMongo(uri, label = 'MongoDB') {
  try {
    console.log(`[${label}] connecting...`);
    await mongoose.connect(uri);
    console.log(`[${label}] connected`);
  } catch (error) {
    console.error(`[${label}] connection error`, error);
    process.exit(1);
  }
}
