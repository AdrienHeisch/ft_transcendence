import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export default async function setup() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client, { schema });
  console.log("[ ] Adding triggers...");
  await db.execute(`
CREATE OR REPLACE FUNCTION canonicalize_friends_pair() RETURNS trigger AS $$
DECLARE
  tmp UUID;
BEGIN
  IF NEW.left > NEW.right THEN
    tmp := NEW.left;
    NEW.left := NEW.right;
    NEW.right := tmp;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_canonicalize_friends_pair
BEFORE INSERT OR UPDATE ON friends_pair
FOR EACH ROW EXECUTE FUNCTION canonicalize_friends_pair();
  `);
  console.log("[✓] Adding triggers...");
  client.end();
}
