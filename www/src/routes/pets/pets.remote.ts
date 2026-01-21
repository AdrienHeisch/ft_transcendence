import { eq, ilike } from "drizzle-orm";
import z from "zod";
import { query } from "$app/server";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

export const getPets = query(
  z.object({
    search: z.string(),
    species: z.string().nullable(),
    sortBy: z.custom<"name" | "species">(),
  }),
  ({ search, species, sortBy }) => {
    const query = db
      .select()
      .from(schema.pet)
      .orderBy(sortBy === "name" ? schema.pet.name : schema.pet.species)
      .$dynamic();
    if (search) {
      query.where(ilike(schema.pet.name, `%${search}%`));
    }
    if (species) {
      query.where(eq(schema.pet.species, species));
    }
    return query;
  },
);
