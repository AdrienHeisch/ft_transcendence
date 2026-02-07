import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { POST_IMAGE_PREFIX, USER_AVATAR_PREFIX } from "../../storage";
import * as schema from "../db/schema";
import { PublicStorage } from "../storage";

export default async function seedStorage() {
  const client = postgres(
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`,
  );
  const db = drizzle(client, { schema });
  console.log("Seeding storage...");
  for (const user of await db.select().from(schema.user)) {
    const key = `${USER_AVATAR_PREFIX + user.id}.png`;
    const fileExists = await PublicStorage.exists(key);
    if (!fileExists) {
      const file = await fetch(
        `https://api.dicebear.com/7.x/avataaars/png?seed=${user.id}`,
      );
      await PublicStorage.upload(key, await file.blob());
      await db.update(schema.user).set({ hasAvatar: true }).where(eq(schema.user.id, user.id));
    }
  }
  for (const post of await db.select().from(schema.post)) {
    const key = `${POST_IMAGE_PREFIX + post.id}.png`;
    const fileExists = await PublicStorage.exists(key);
    if (!fileExists) {
      const file = await fetch(
        "https://www.l214.com/wp-content/uploads/2021/06/vache-meugle-1024x535.jpg",
      );
      await PublicStorage.upload(key, await file.blob());
    }
  }
  console.log("Done");
  client.end();
}
