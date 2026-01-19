import { error } from "@sveltejs/kit";
import { and, eq, or } from "drizzle-orm";
import { union } from "drizzle-orm/pg-core";
import * as z from "zod";
import { command, getRequestEvent, query } from "$app/server";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

export const getFriends = query(() => {
  const user = requireLogin();
  return union(
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
});

export const addFriend = command(
  z.object({
    id: z.string(),
  }),
  async (friend) => {
    const user = requireLogin();
    try {
      await db.insert(schema.friendsPair).values({
        id: crypto.randomUUID(),
        left: user.id,
        right: friend.id,
        pending: friend.id,
      });
    } catch {
      error(500);
    }
    getFriends().refresh();
  },
);

export const acceptFriend = command(
  z.object({
    id: z.string(),
  }),
  async (friend) => {
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
                eq(schema.friendsPair.left, friend.id),
                eq(schema.friendsPair.right, friend.id),
              ),
            ),
          ),
        );
    } catch {
      error(500);
    }
    getFriends().refresh();
  },
);

export const removeFriend = command(
  z.object({
    id: z.string(),
  }),
  async (friend) => {
    const user = requireLogin();
    await db
      .delete(schema.friendsPair)
      .where(
        or(
          and(
            eq(schema.friendsPair.left, user.id),
            eq(schema.friendsPair.right, friend.id),
          ),
          and(
            eq(schema.friendsPair.right, user.id),
            eq(schema.friendsPair.left, friend.id),
          ),
        ),
      );
    getFriends().refresh();
  },
);

function requireLogin() {
  const { locals } = getRequestEvent();

  if (!locals.user) {
    error(403, "Unauthenticated");
  }

  return locals.user;
}
