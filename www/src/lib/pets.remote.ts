import { redirect } from "@sveltejs/kit";
import { and, eq, ilike, inArray } from "drizzle-orm";
import z from "zod";
import { resolve } from "$app/paths";
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
    bio: z.string().optional(),
    species: z.string(),
    breed: z.string(),
  }),
  async ({ name, age, bio, species, breed }) => {
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
      hasAvatar: false,
    });
    redirect(303, resolve(`/pets/${id}`));
  },
);
