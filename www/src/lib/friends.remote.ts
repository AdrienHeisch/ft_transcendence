import { error } from "@sveltejs/kit";
import { and, eq, getTableColumns, or, sql } from "drizzle-orm";
import { union } from "drizzle-orm/pg-core";
import * as z from "zod";
import { command, query } from "$app/server";
import { isLoggedIn, requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

//TODO batch query ?
export const getUserFriends = query(z.string(), (userId: string) => {
  type Side = "left" | "right";
  const select = (self: Side, other: Side) => {
    return db
      .select({
        ...getTableColumns(schema.user),
        status: sql<
          "sent" | "received" | null
        >`CASE ${schema.friendsPair.pending}
          WHEN ${schema.friendsPair[other]} THEN 'sent'
          WHEN ${schema.friendsPair[self]} THEN 'received'
          ELSE NULL
          END`,
      })
      .from(schema.friendsPair)
      .where(eq(schema.friendsPair[self], userId))
      .innerJoin(schema.user, eq(schema.friendsPair[other], schema.user.id));
  };
  return union(select("left", "right"), select("right", "left"));
});

export const getFriends = query(() => {
  if (!isLoggedIn()) return [];
  const user = requireLogin();
  return getUserFriends(user.id);
});

export const addFriend = command(z.string(), async (friendId) => {
  const user = requireLogin();
  try {
    await db.insert(schema.friendsPair).values({
      id: crypto.randomUUID(),
      left: user.id,
      right: friendId,
      pending: friendId,
    });
  } catch {
    error(500);
  }
  await getFriends().refresh();
});

export const acceptFriend = command(z.string(), async (friendId) => {
  const user = requireLogin();
  try {
    await db
      .update(schema.friendsPair)
      .set({
        pending: null,
      })
      .where(
        and(
          eq(schema.friendsPair.pending, user.id),
          and(
            or(
              eq(schema.friendsPair.left, user.id),
              eq(schema.friendsPair.right, user.id),
            ),
            or(
              eq(schema.friendsPair.left, friendId),
              eq(schema.friendsPair.right, friendId),
            ),
          ),
        ),
      );
  } catch {
    error(500);
  }
  await getFriends().refresh();
});

export const removeFriend = command(z.string(), async (friendId) => {
  const user = requireLogin();
  await db
    .delete(schema.friendsPair)
    .where(
      or(
        and(
          eq(schema.friendsPair.left, user.id),
          eq(schema.friendsPair.right, friendId),
        ),
        and(
          eq(schema.friendsPair.right, user.id),
          eq(schema.friendsPair.left, friendId),
        ),
      ),
    );
  await getFriends().refresh();
});
