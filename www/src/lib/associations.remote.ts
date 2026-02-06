import { and, eq, getTableColumns, ilike, inArray } from "drizzle-orm";
import z from "zod";
import { query } from "$app/server";
import * as schema from "$lib/server/db/schema";
import { db } from "./server/db";

export const getAssociation = query.batch(z.string(), async (associations) => {
  const result = await db
    .select()
    .from(schema.association)
    .where(inArray(schema.association.id, associations));
  const lookup = new Map(
    result.map((association) => [association.id, association]),
  );
  return (association) => lookup.get(association);
});

export const getAssociations = query(
  z.object({
    search: z.string(),
    type: schema.associationTypeSchema.nullable(),
    city: z.string().nullable(),
    sortBy: z.custom<"name" | "type">(),
  }),
  ({ search, type, city, sortBy }) => {
    return db
      .select()
      .from(schema.association)
      .where(
        and(
          search ? ilike(schema.association.name, `%${search}%`) : undefined,
          city ? eq(schema.association.city, city) : undefined,
          type ? eq(schema.association.type, type) : undefined,
        ),
      )
      .orderBy(getTableColumns(schema.association)[sortBy]);
  },
);

export const getPetsCount = query(z.string(), (id) => {
  return db.$count(schema.pet, eq(schema.pet.ownerId, id));
});
