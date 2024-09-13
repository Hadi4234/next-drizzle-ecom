import * as z from "zod";
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  POSTGRES_URL: z.string().url(),
  SECRET: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),

})

const env = envSchema.parse(process.env)


export default env