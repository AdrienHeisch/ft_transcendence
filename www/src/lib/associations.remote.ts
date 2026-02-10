import { and, eq, getTableColumns, ilike, inArray, sql } from "drizzle-orm";
import z from "zod";
import { query } from "$app/server";
import * as schema from "$lib/server/db/schema";
import { db } from "./server/db";

export const getAssociation = query.batch(z.string(), async (associations) => {
  const result = await db
    .select({
      ...getTableColumns(schema.association),
      city: getTableColumns(schema.city),
    })
    .from(schema.association)
    .where(inArray(schema.association.id, associations))
    .innerJoin(schema.city, eq(schema.city.code, schema.association.city));
  const lookup = new Map(
    result.map((association) => [association.id, association]),
  );
  return (association) => lookup.get(association);
});

export const getAssociations = query(
  z.object({
    search: z.string(),
    type: schema.associationTypeSchema.optional(),
    city: z.string().optional(),
    sortBy: z.custom<"name" | "type">(),
    offset: z.int().optional(),
    limit: z.int().optional(),
  }),
  ({ search, type, city, sortBy, offset, limit }) => {
    const query = db
      .select({
        ...getTableColumns(schema.association),
        city: getTableColumns(schema.city),
        count: sql`count(*) over()`.mapWith(Number),
      })
      .from(schema.association)
      .where(
        and(
          search ? ilike(schema.association.name, `%${search}%`) : undefined,
          city ? eq(schema.association.city, city) : undefined,
          type ? eq(schema.association.type, type) : undefined,
        ),
      )
      .innerJoin(schema.city, eq(schema.city.code, schema.association.city))
      .orderBy(getTableColumns(schema.association)[sortBy])
      .$dynamic();
    if (offset) query.offset(offset);
    if (limit) query.limit(limit);
    return query;
  },
);

export const getPetsCount = query(z.string(), (id) => {
  return db.$count(schema.pet, eq(schema.pet.ownerId, id));
});
