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
        id: schema.friendsPair.left,
        accepted: schema.friendsPair.accepted,
      })
      .from(schema.friendsPair)
      .where(eq(schema.friendsPair.right, user.id)),
    db
      .select({
        id: schema.friendsPair.right,
        accepted: schema.friendsPair.accepted,
      })
      .from(schema.friendsPair)
      .where(eq(schema.friendsPair.left, user.id)),
  );
});

export const addFriend = command(
  z.object({
    id: z.string(),
  }),
  async ({ id }) => {
    const user = requireLogin();
    let friend: schema.User;
    try {
      [friend] = await db
        .select()
        .from(schema.user)
        .where(eq(schema.user.id, id));
    } catch {
      error(500);
    }
    if (!friend) error(404, "No user with this id");
    const accepted = user.id < friend.id ? "right" : "left";
    try {
      await db.insert(schema.friendsPair).values({
        id: crypto.randomUUID(),
        left: user.id,
        right: friend.id,
        accepted,
      });
    } catch {
      error(500);
    }
    getFriends().refresh();
  },
);

export const removeFriend = command(
  z.object({ id: z.string() }),
  async ({ id }) => {
    const user = requireLogin();
    await db
      .delete(schema.friendsPair)
      .where(
        or(
          and(
            eq(schema.friendsPair.left, user.id),
            eq(schema.friendsPair.right, id),
          ),
          and(
            eq(schema.friendsPair.right, user.id),
            eq(schema.friendsPair.left, id),
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
