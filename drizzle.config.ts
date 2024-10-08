import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import { env } from './env';

dotenv.config({
  path: '.env.local',
});

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/schema.ts',
  out: './server/migrations',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
});
