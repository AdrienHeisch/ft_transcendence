import { drizzle } from "npm:drizzle-orm@^0.45.1/node-postgres";
import pg from "npm:pg@^8.13.1";
import * as table from "./src/lib/server/db/schema.ts";
import { sql } from "npm:drizzle-orm@^0.45.1";

const { Pool } = pg;

const pool = new Pool({
	connectionString: Deno.env.get("DATABASE_URL") || 
		"postgres://root:mysecretpassword@localhost:5432/local",
});

const db = drizzle(pool);

console.log("🗑️  Suppression de tous les animaux...");

await db.execute(sql`DELETE FROM pet`);

console.log("✅ Table vidée avec succès !");
await pool.end();
Deno.exit(0);
