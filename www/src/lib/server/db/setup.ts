import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export default async function setup() {
  const client = postgres(
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`,
  );
  const db = drizzle(client, { schema });
  console.log("[ ] Adding triggers...");
  //TODO check what happens if left == right
  const query = `
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
  `;
  console.log(query);
  await db.execute(query);
  console.log("[✓] Adding triggers...");
  client.end();
}
