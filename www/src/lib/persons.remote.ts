import { and, ilike, inArray, or } from "drizzle-orm";
import z from "zod";
import { query } from "$app/server";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

export const getPerson = query.batch(z.string(), async (persons) => {
  const result = await db
    .select()
    .from(schema.user)
    .where(inArray(schema.user.id, persons));
  const lookup = new Map(result.map((user) => [user.id, user]));
  return (user) => lookup.get(user);
});

export const getPersons = query(
  z.object({
    search: z.string(),
    sortBy: z.custom<"firstName" | "lastName">(),
  }),
  ({ search, sortBy }) => {
    return db
      .select()
      .from(schema.user)
      .where(
        and(
          or(
            ilike(schema.user.firstName, `%${search}%`),
            ilike(schema.user.lastName, `%${search}%`),
          ),
        ),
      )
      .orderBy(
        sortBy === "firstName" ? schema.user.firstName : schema.user.lastName,
      );
  },
);
