import { error } from "@sveltejs/kit";
import { and, eq, getTableColumns, ilike, inArray, or } from "drizzle-orm";
import z from "zod";
import { form, query } from "$app/server";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

export const getPerson = query.batch(z.string(), async (persons) => {
  const result = await db
    .select({
      ...getTableColumns(schema.user),
      city: getTableColumns(schema.city),
    })
    .from(schema.user)
    .where(inArray(schema.user.id, persons))
    .innerJoin(schema.city, eq(schema.city.code, schema.user.city));
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
      .select({
        ...getTableColumns(schema.user),
        city: getTableColumns(schema.city),
      })
      .from(schema.user)
      .where(
        and(
          or(
            ilike(schema.user.firstName, `%${search}%`),
            ilike(schema.user.lastName, `%${search}%`),
          ),
        ),
      )
      .innerJoin(schema.city, eq(schema.city.code, schema.user.city))
      .orderBy(
        sortBy === "firstName" ? schema.user.firstName : schema.user.lastName,
      );
  },
);

export const updatePerson = form(
  z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    bio: z.string(),
  }),
  async (data) => {
    const { id, ...values } = data;
    if (id !== requireLogin().id) {
      error(403);
    }
    await db.update(schema.user).set(values).where(eq(schema.user.id, id));
    await getPerson(id).refresh();
  },
);
