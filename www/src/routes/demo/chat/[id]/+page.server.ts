import { and, desc, eq, getTableColumns, or } from "drizzle-orm";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const user = requireLogin();
  console.log(`chat: ${params.id}, user: ${user.id}`);
  return {
    messages: db
      .select({ ...getTableColumns(schema.chatMessage) })
      .from(schema.chatMessage)
      .innerJoin(
        schema.friendsPair,
        eq(schema.friendsPair.id, schema.chatMessage.friendsId),
      )
      .where(
        and(
          eq(schema.friendsPair.id, params.id),
          or(
            eq(schema.friendsPair.left, user.id),
            eq(schema.friendsPair.right, user.id),
          ),
        ),
      )
      .orderBy(desc(schema.chatMessage.sentAt)),
  };
};
