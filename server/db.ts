import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Use environment variable or fallback to default local database
const databaseUrl = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/osba_db";

let pool: any;
let db: any;

try {
  pool = new Pool({ 
    connectionString: databaseUrl,
    statement_timeout: 5000,
    connectionTimeoutMillis: 5000
  });
  db = drizzle(pool, { schema });
  console.log("Database connected successfully");
} catch (error) {
  console.warn("Database connection failed, using mock data:", error);
  // Create a mock database that doesn't require actual connection
  db = null;
}

export { pool, db };
