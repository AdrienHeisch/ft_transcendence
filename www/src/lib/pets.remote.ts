import { and, eq, ilike, inArray } from "drizzle-orm";
import z from "zod";
import { form, query } from "$app/server";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

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
      .select()
      .from(schema.pet)
      .where(
        and(
          ilike(schema.pet.name, `%${search}%`),
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
    bio: z.string(),
    species: z.string(),
    breed: z.string(),
  }),
  ({ name, age, bio, species, breed }) => {
    const user = requireLogin();
    return db.insert(schema.pet).values({
      id: crypto.randomUUID(),
      ownerId: user.id,
      name,
      age,
      bio,
      species,
      breed,
      hasAvatar: false,
    });
  },
);
