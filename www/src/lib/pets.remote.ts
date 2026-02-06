import { error, redirect } from "@sveltejs/kit";
import { and, eq, getTableColumns, ilike, inArray, or } from "drizzle-orm";
import z from "zod";
import { resolve } from "$app/paths";
import { form, query } from "$app/server";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { PublicStorage } from "$lib/server/storage";
import { PET_AVATAR_PREFIX } from "$lib/storage";

export const getPet = query.batch(z.string(), async (pets) => {
  const result = await db
    .select()
    .from(schema.pet)
    .where(inArray(schema.pet.id, pets));
  const lookup = new Map(result.map((pet) => [pet.id, pet]));
  return (pet) => lookup.get(pet);
});

export const getPets = query(
  z.object({
    owner: z.string().optional(),
    search: z.string(),
    species: z.string().nullable(),
    sortBy: z.custom<"name" | "species">(),
  }),
  ({ owner, search, species, sortBy }) => {
    return db
      .select(getTableColumns(schema.pet))
      .from(schema.pet)
      .innerJoin(schema.user, eq(schema.user.id, schema.pet.ownerId))
      .where(
        and(
          or(
            ilike(schema.pet.name, `%${search}%`),
            ilike(schema.user.firstName, `%${search}%`),
            ilike(schema.user.lastName, `%${search}%`),
          ),
          owner ? eq(schema.pet.ownerId, owner) : undefined,
          species ? eq(schema.pet.species, species) : undefined,
        ),
      )
      .orderBy(sortBy === "name" ? schema.pet.name : schema.pet.species);
  },
);

export const createPet = form(
  z.object({
    name: z.string(),
    age: z.int(),
    bio: z.string().optional(),
    species: z.string(),
    breed: z.string(),
    avatar: z.custom<File>(),
  }),
  async ({ name, age, bio, species, breed, avatar }) => {
    const user = requireLogin();
    const id = crypto.randomUUID();
    await db.insert(schema.pet).values({
      id,
      ownerId: user.id,
      name,
      age,
      bio: bio ?? "",
      species,
      breed,
      hasAvatar: true,
    });
    try {
      await PublicStorage.upload(`${PET_AVATAR_PREFIX + id}.png`, avatar);
    } catch {
      error(500, "Failed to import file");
    }
    redirect(303, resolve(`/pets/${id}`));
  },
);
