import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export default async function runMigrations() {
  const client = postgres(
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`,
    { max: 1 },
  );

  const db = drizzle(client, { schema });

  console.log("Running migrations...");

  // Create schema directly using SQL
  await db.execute(`
    CREATE TABLE IF NOT EXISTS "session" (
      "id" text PRIMARY KEY NOT NULL,
      "user_id" uuid NOT NULL,
      "expires_at" timestamp with time zone NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "city" (
      "code" text PRIMARY KEY NOT NULL,
      "name" text NOT NULL UNIQUE,
      "location" point NOT NULL
    );
  `);

  await db.execute(`
    CREATE INDEX IF NOT EXISTS "spatial_index" ON "city" USING gist ("location");
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "user" (
      "id" uuid PRIMARY KEY NOT NULL,
      "email" text NOT NULL UNIQUE,
      "password_hash" text NOT NULL,
      "first_name" text NOT NULL,
      "last_name" text NOT NULL,
      "bio" text NOT NULL,
      "city" text REFERENCES "city"("name"),
      "has_avatar" boolean NOT NULL,
      "online" boolean NOT NULL
    );
  `);

  await db.execute(`
    ALTER TABLE "session" DROP CONSTRAINT IF EXISTS "session_user_id_user_id_fk";
    ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" 
      FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "pet" (
      "id" uuid PRIMARY KEY NOT NULL,
      "owner_id" uuid NOT NULL REFERENCES "user"("id"),
      "name" text NOT NULL,
      "species" text NOT NULL,
      "breed" text NOT NULL,
      "birth" timestamp with time zone NOT NULL,
      "description" text NOT NULL,
      "has_avatar" boolean NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "users_pair" (
      "id" uuid NOT NULL UNIQUE,
      "left" uuid NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "right" uuid NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "friends" boolean NOT NULL,
      "pending" uuid REFERENCES "user"("id") ON DELETE CASCADE,
      PRIMARY KEY ("left", "right"),
      CONSTRAINT "ids_order" CHECK ("left" < "right")
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "chat_message" (
      "id" uuid PRIMARY KEY NOT NULL,
      "friends_id" uuid NOT NULL REFERENCES "users_pair"("id") ON DELETE CASCADE,
      "author" uuid NOT NULL REFERENCES "user"("id"),
      "content" text NOT NULL,
      "sent_at" timestamp with time zone NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "post" (
      "id" uuid PRIMARY KEY NOT NULL,
      "author" uuid NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "content" text NOT NULL,
      "posted_at" timestamp with time zone NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "post_like" (
      "post" uuid NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
      "user" uuid NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      PRIMARY KEY ("post", "user")
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "post_comment" (
      "id" uuid PRIMARY KEY NOT NULL,
      "post" uuid NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
      "author" uuid NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "content" text NOT NULL,
      "posted_at" timestamp with time zone NOT NULL
    );
  `);

  await db.execute(`
    DO $$ BEGIN
      CREATE TYPE "association_type" AS ENUM ('Sanctuary', 'Rescue', 'Adoption', 'Care');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "association" (
      "id" uuid PRIMARY KEY NOT NULL,
      "name" text NOT NULL,
      "email" text NOT NULL,
      "phone" text NOT NULL,
      "description" text NOT NULL,
      "city" text REFERENCES "city"("name"),
      "type" association_type NOT NULL,
      "founded_at" timestamp with time zone NOT NULL
    );
  `);

  console.log("Migrations completed successfully!");
  await client.end();
}
