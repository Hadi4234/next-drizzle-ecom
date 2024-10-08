import { z } from 'zod';

// Define the schema as an object with all of the env
// variables and their types
const envSchema = z.object({
  POSTGRES_URL: z.string().url(),
  SECRET: z.string().min(1),
  AUTH_GITHUB_ID: z.string().min(1),
  AUTH_GITHUB_SECRET: z.string().min(1),
  UPLOADTHING_SECRET: z.string().min(1),

  UPLOADTHING_APP_ID: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_SECRET_KEY: z.string().min(1),
  ENV: z
    .union([
      z.literal('development'),
      z.literal('testing'),
      z.literal('production'),
    ])
    .default('development'),
  // ...
});

// Validate `process.env` against our schema
// and return the result
const env = envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
// Export the result so we can use it in the project
export default env;
