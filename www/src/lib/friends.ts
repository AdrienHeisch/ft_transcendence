import { eq } from "drizzle-orm";
import { union } from "drizzle-orm/pg-core";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

export const friendsOf = (user: { id: string }) =>
  union(
    db
      .select({
        user: schema.user,
        pending: schema.friendsPair.pending,
      })
      .from(schema.friendsPair)
      .where(eq(schema.friendsPair.right, user.id))
      .innerJoin(schema.user, eq(schema.friendsPair.left, schema.user.id)),
    db
      .select({
        user: schema.user,
        pending: schema.friendsPair.pending,
      })
      .from(schema.friendsPair)
      .where(eq(schema.friendsPair.left, user.id))
      .innerJoin(schema.user, eq(schema.friendsPair.right, schema.user.id)),
  );
