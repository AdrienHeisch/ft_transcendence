import { error } from "@sveltejs/kit";
import { and, eq, getTableColumns, ilike, inArray, or, sql } from "drizzle-orm";
import z from "zod";
import { form, query } from "$app/server";
import { MAX_FILE_SIZE } from "$env/static/private";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { PublicStorage } from "./server/storage";
import { USER_AVATAR_PREFIX } from "./storage";

const { apiKey, passwordHash, ...userColumns } = getTableColumns(schema.user);

export const getPerson = query.batch(z.string(), async (persons) => {
  const result = await db
    .select({
      ...userColumns,
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
    city: z.string().optional(),
    sortBy: z.custom<"firstName" | "lastName">(),
    offset: z.int().optional(),
    limit: z.int().optional(),
  }),
  ({ search, city, sortBy, offset, limit }) => {
    const query = db
      .select({
        ...userColumns,
        city: getTableColumns(schema.city),
        count: sql`count(*) over()`.mapWith(Number),
      })
      .from(schema.user)
      .where(
        and(
          or(
            ilike(schema.user.firstName, `%${search}%`),
            ilike(schema.user.lastName, `%${search}%`),
          ),
          city ? eq(schema.user.city, city) : undefined,
        ),
      )
      .innerJoin(schema.city, eq(schema.city.code, schema.user.city))
      .orderBy(
        sortBy === "firstName" ? schema.user.firstName : schema.user.lastName,
      )
      .$dynamic();
    if (offset) query.offset(offset);
    if (limit) query.limit(limit);
    return query;
  },
);

export const updatePerson = form(
  z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    bio: z.string(),
    city: z.string(),
    avatar: z.custom<File>().optional(),
    removeAvatar: z.string(),
  }),
  async (data) => {
    const { id, avatar, removeAvatar, ...values } = data;
    if (id !== requireLogin().id) {
      error(403);
    }
    if (avatar) {
      if (avatar.size > Number(MAX_FILE_SIZE)) {
        error(413);
      }
      if (!avatar.type.startsWith("image/")) {
        error(415);
      }
      await PublicStorage.upload(USER_AVATAR_PREFIX + id, avatar, avatar.type);
      await db
        .update(schema.user)
        .set({ ...values, hasAvatar: true })
        .where(eq(schema.user.id, id));
    } else if (removeAvatar === "true") {
      await PublicStorage.delete(USER_AVATAR_PREFIX + id);
      await db
        .update(schema.user)
        .set({ ...values, hasAvatar: false })
        .where(eq(schema.user.id, id));
    } else {
      await db.update(schema.user).set(values).where(eq(schema.user.id, id));
    }
    await getPerson(id).refresh();
  },
);
