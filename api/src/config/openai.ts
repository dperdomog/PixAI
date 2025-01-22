import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local from root directory
dotenv.config({ path: path.join(__dirname, '../../../.env.local') });

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined in environment variables');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}); 