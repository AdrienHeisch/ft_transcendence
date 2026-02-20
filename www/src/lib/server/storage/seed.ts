import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { POST_IMAGE_PREFIX, USER_AVATAR_PREFIX } from "../../storage";
import * as schema from "../db/schema";
import { PublicStorage } from "../storage";
import petImages from "./pet-images.json";

const allSpecies = Object.keys(petImages) as (keyof typeof petImages)[];

function randomImage(species: keyof typeof petImages): string {
  const images = petImages[species];
  return images[Math.floor(Math.random() * images.length)];
}

export default async function seedStorage() {
  const client = postgres(
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`,
  );
  const db = drizzle(client, { schema });
  console.log("Seeding storage...");
  for (const user of await db.select().from(schema.user)) {
    const key = USER_AVATAR_PREFIX + user.id;
    const fileExists = await PublicStorage.exists(key);
    if (!fileExists) {
      const file = await fetch(
        `https://api.dicebear.com/7.x/avataaars/png?seed=${user.id}`,
      );
      await PublicStorage.upload(key, await file.blob(), "image/png");
    }
  }
  const pets = await db.select().from(schema.pet);
  const petById = new Map(pets.map((p) => [p.id, p]));
  for (const post of await db.select().from(schema.post)) {
    const key = POST_IMAGE_PREFIX + post.id;
    const fileExists = await PublicStorage.exists(key);
    if (!fileExists) {
      const pet = post.pet ? petById.get(post.pet) : null;
      const species =
        pet && pet.species in petImages
          ? (pet.species as keyof typeof petImages)
          : allSpecies[Math.floor(Math.random() * allSpecies.length)];
      const imageUrl = randomImage(species);
      const file = await fetch(imageUrl);
      await PublicStorage.upload(key, await file.blob(), "image/jpeg");
    }
  }
  console.log("Done");
  client.end();
}
