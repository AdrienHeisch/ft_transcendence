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
        status: sql<"sent" | "received" | null>`CASE ${schema.usersPair.pending}
          WHEN ${schema.usersPair[self]} THEN 'received'
          WHEN ${schema.usersPair[other]} THEN 'sent'
          ELSE NULL
          END`,
      })
      .from(schema.usersPair)
      .where(
        and(
          eq(schema.usersPair.friends, true),
          eq(schema.usersPair[self], userId),
        ),
      )
      .innerJoin(schema.user, eq(schema.usersPair[other], schema.user.id));
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
    await db.insert(schema.usersPair).values({
      id: crypto.randomUUID(),
      left: user.id,
      right: friendId,
      friends: true,
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
      .update(schema.usersPair)
      .set({
        pending: null,
      })
      .where(
        and(
          eq(schema.usersPair.friends, true),
          eq(schema.usersPair.pending, user.id),
          and(
            or(
              eq(schema.usersPair.left, user.id),
              eq(schema.usersPair.right, user.id),
            ),
            or(
              eq(schema.usersPair.left, friendId),
              eq(schema.usersPair.right, friendId),
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
    .update(schema.usersPair)
    .set({
      friends: false,
      pending: null,
    })
    .where(
      and(
        eq(schema.usersPair.friends, true),
        eq(schema.usersPair.pending, user.id),
        and(
          or(
            eq(schema.usersPair.left, user.id),
            eq(schema.usersPair.right, user.id),
          ),
          or(
            eq(schema.usersPair.left, friendId),
            eq(schema.usersPair.right, friendId),
          ),
        ),
      ),
    );
  await getFriends().refresh();
});
