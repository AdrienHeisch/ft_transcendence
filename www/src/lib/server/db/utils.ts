import { and, eq, getTableColumns, isNull } from "drizzle-orm";
import { union } from "drizzle-orm/pg-core";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { User } from "./schema";

export async function getUserFriends(userId: string): Promise<User[]> {
  return union(
    db
      .select(getTableColumns(schema.user))
      .from(schema.friendsPair)
      .where(
        and(
          eq(schema.friendsPair.right, userId),
          isNull(schema.friendsPair.pending),
        ),
      )
      .innerJoin(schema.user, eq(schema.friendsPair.left, schema.user.id)),
    db
      .select(getTableColumns(schema.user))
      .from(schema.friendsPair)
      .where(
        and(
          eq(schema.friendsPair.left, userId),
          isNull(schema.friendsPair.pending),
        ),
      )
      .innerJoin(schema.user, eq(schema.friendsPair.right, schema.user.id)),
  );
}
