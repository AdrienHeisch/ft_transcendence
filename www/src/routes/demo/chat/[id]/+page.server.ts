import { error } from "@sveltejs/kit";
import { and, desc, eq, or } from "drizzle-orm";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params, locals }) => {
  if (!locals.user) {
    error(403);
  }
  console.log(`chat: ${params.id}, user: ${locals.user.id}`);
  return {
    messages: db
      .select()
      .from(schema.chatMessage)
      .innerJoin(
        schema.friendsPair,
        eq(schema.friendsPair.id, schema.chatMessage.friendsId),
      )
      .where(
        and(
          eq(schema.friendsPair.id, params.id),
          or(
            eq(schema.friendsPair.left, locals.user.id),
            eq(schema.friendsPair.right, locals.user.id),
          ),
        ),
      ).orderBy(desc(schema.chatMessage.sentAt)),
  };
};
