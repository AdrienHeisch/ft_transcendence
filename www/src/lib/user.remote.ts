import { inArray } from "drizzle-orm";
import z from "zod";
import { query } from "$app/server";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

export const getUser = query.batch(z.string(), async (users) => {
  if (users === undefined) {
    console.error("USERS UNDEFINED");
  }
  const result = await db
    .select()
    .from(schema.userPublic)
    .where(inArray(schema.userPublic.id, users));
  const lookup = new Map(
    result
      .map((user) => user as schema.UserPublic)
      .map((user) => [user.id, user]),
  );
  return (user) => lookup.get(user);
});
