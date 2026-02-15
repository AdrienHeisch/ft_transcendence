import { error } from "@sveltejs/kit";
import { eq, getTableColumns } from "drizzle-orm";
import z from "zod";
import { query } from "$app/server";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { MESSAGE_FILE_PREFIX, PrivateStorage } from "$lib/server/storage";

export const getMessageFile = query(z.string(), async (id) => {
  const user = requireLogin();
  const [{ chatMessage, usersPair }] = await db
    .select({
      chatMessage: getTableColumns(schema.chatMessage),
      usersPair: getTableColumns(schema.usersPair),
    })
    .from(schema.chatMessage)
    .where(eq(schema.chatMessage.id, id))
    .innerJoin(
      schema.usersPair,
      eq(schema.chatMessage.friendsId, schema.usersPair.id),
    );
  if (!chatMessage || !usersPair) {
    error(404);
  }
  if (user.id !== usersPair.left && user.id !== usersPair.right) {
    error(403);
  }
  return PrivateStorage.url(`${MESSAGE_FILE_PREFIX + id}.png`);
});
