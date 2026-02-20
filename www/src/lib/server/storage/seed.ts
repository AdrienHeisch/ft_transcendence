import { eq, getTableColumns } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  PET_AVATAR_PREFIX,
  POST_IMAGE_PREFIX,
  USER_AVATAR_PREFIX,
} from "../../storage";
import * as schema from "../db/schema";
import { PublicStorage } from "../storage";
import petImages from "./pet-images.json";

const allSpecies = Object.keys(petImages) as (keyof typeof petImages)[];

function randomImage(pet?: schema.Pet): string {
  const species =
    pet && pet.species in petImages
      ? (pet.species as keyof typeof petImages)
      : allSpecies[Math.floor(Math.random() * allSpecies.length)];
  const images = petImages[species];
  return images[Math.floor(Math.random() * images.length)];
}

async function uploadPetImage(key: string, pet?: schema.Pet) {
  const imageUrl = randomImage(pet);
  const file = await fetch(imageUrl);
  await PublicStorage.upload(key, await file.blob(), "image/jpeg");
}

export default async function seedStorage() {
  const client = postgres(
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`,
  );
  const db = drizzle(client, { schema });
  console.log("Seeding storage...");
  for (const user of await db.select().from(schema.user)) {
    const file = await fetch(
      `https://api.dicebear.com/7.x/avataaars/png?seed=${user.id}`,
    );
    await PublicStorage.upload(
      USER_AVATAR_PREFIX + user.id,
      await file.blob(),
      "image/png",
    );
  }
  const pets = await db.select().from(schema.pet);
  for (const pet of pets) {
    await uploadPetImage(PET_AVATAR_PREFIX + pet.id, pet);
  }
  await db.update(schema.pet).set({ hasAvatar: true });
  const posts = await db
    .select({ ...getTableColumns(schema.post), pet: schema.pet })
    .from(schema.post)
    .leftJoin(schema.pet, eq(schema.post.pet, schema.pet.id));
  for (const post of posts) {
    await uploadPetImage(POST_IMAGE_PREFIX + post.id, post.pet ?? undefined);
  }
  console.log("Done");
  client.end();
}
