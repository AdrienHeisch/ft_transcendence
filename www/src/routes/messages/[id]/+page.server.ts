import { and, desc, eq, getTableColumns, or } from "drizzle-orm";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const user = requireLogin();
  let pairId: string;
  try {
    [{ id: pairId }] = await db
      .select()
      .from(schema.usersPair)
      .where(
        or(
          and(
            eq(schema.usersPair.left, user.id),
            eq(schema.usersPair.right, params.id),
          ),
          and(
            eq(schema.usersPair.left, params.id),
            eq(schema.usersPair.right, user.id),
          ),
        ),
      );
  } catch {
    [{ id: pairId }] = await db
      .insert(schema.usersPair)
      .values({
        id: crypto.randomUUID(),
        left: user.id,
        right: params.id,
        friends: false,
        pending: null,
      })
      .returning();
  }
  return {
    messages: db
      .select({ ...getTableColumns(schema.chatMessage) })
      .from(schema.chatMessage)
      .innerJoin(
        schema.usersPair,
        eq(schema.usersPair.id, schema.chatMessage.friendsId),
      )
      .where(eq(schema.usersPair.id, pairId))
      .orderBy(desc(schema.chatMessage.sentAt)),
  };
};
