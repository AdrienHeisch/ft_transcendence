import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "$env/dynamic/private";
import * as schema from "./schema";
import { building } from "$app/environment";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });

if (!building) {
  await db.execute(`
CREATE OR REPLACE FUNCTION canonicalize_friends_pair() RETURNS trigger AS $$
DECLARE
  temp_left UUID;
BEGIN
  IF NEW.left > NEW.right THEN
    temp_left := NEW.left;
    NEW.left := NEW.right;
    NEW.right := temp_left;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_canonicalize_friends_pair
BEFORE INSERT OR UPDATE ON friends_pair
FOR EACH ROW EXECUTE FUNCTION canonicalize_friends_pair();
  `);
}
