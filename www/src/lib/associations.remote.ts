import { and, eq, getTableColumns, ilike } from "drizzle-orm";
import z from "zod";
import { query } from "$app/server";
import * as schema from "$lib/server/db/schema";
import { db } from "./server/db";

export const getAssociations = query(
  z.object({
    search: z.string(),
    type: z.string().nullable(),
    city: z.string().nullable(),
    sortBy: z.custom<"name" | "type" | "city" | "animalsCount">(),
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
