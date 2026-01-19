import { error } from "@sveltejs/kit";
import { eq, or } from "drizzle-orm";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
  if (!locals.user) {
    error(403);
  }
  return {
    chats: db
      .select({ id: schema.friendsPair.id })
      .from(schema.friendsPair)
      .where(
        or(
          eq(schema.friendsPair.left, locals.user.id),
          eq(schema.friendsPair.right, locals.user.id),
        ),
      ),
  };
};
