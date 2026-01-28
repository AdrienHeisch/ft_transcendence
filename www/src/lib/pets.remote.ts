import { and, eq, ilike } from "drizzle-orm";
import z from "zod";
import { query } from "$app/server";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

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
