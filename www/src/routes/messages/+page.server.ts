import { desc, eq, getTableColumns, or } from "drizzle-orm";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const currentUser = requireLogin();
  const chats = await Promise.all(
    (
      await db
        .select()
        .from(schema.usersPair)
        .where(
          or(
            eq(schema.usersPair.left, currentUser.id),
            eq(schema.usersPair.right, currentUser.id),
          ),
        )
    ).map(async (chat) => ({
      ...chat,
      lastMessage: (
        await db
          .select({
            ...getTableColumns(schema.chatMessage),
            author: getTableColumns(schema.user),
          })
          .from(schema.chatMessage)
          .where(eq(schema.chatMessage.friendsId, chat.id))
          .innerJoin(schema.user, eq(schema.user.id, schema.chatMessage.author))
          .limit(1)
          .orderBy(desc(schema.chatMessage.sentAt))
      ).at(0),
    })),
  );
  return {
    currentUser,
    chats,
  };
};
