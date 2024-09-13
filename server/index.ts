import { neon } from "@neondatabase/serverless" 
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "@/server/schema"


const sql = neon("postgresql://comDB_owner:8l1vmDGbJiFS@ep-purple-moon-a52ke39i.us-east-2.aws.neon.tech/comDB?sslmode=require");
export const db = drizzle(sql, { schema, logger: true })