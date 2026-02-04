import { and, desc, eq, getTableColumns, or } from "drizzle-orm";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const user = requireLogin();
  return {
    messages: db
      .select({ ...getTableColumns(schema.chatMessage) })
      .from(schema.chatMessage)
      .innerJoin(
        schema.usersPair,
        eq(schema.usersPair.id, schema.chatMessage.friendsId),
      )
      .where(
        and(
          eq(schema.usersPair.id, params.id),
          or(
            eq(schema.usersPair.left, user.id),
            eq(schema.usersPair.right, user.id),
          ),
        ),
      )
      .orderBy(desc(schema.chatMessage.sentAt)),
  };
};
