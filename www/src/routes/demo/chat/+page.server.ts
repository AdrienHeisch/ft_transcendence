import { eq, or } from "drizzle-orm";
import { requireLogin } from "$lib/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const user = requireLogin();
  return {
    chats: db
      .select({ id: schema.friendsPair.id })
      .from(schema.friendsPair)
      .where(
        or(
          eq(schema.friendsPair.left, user.id),
          eq(schema.friendsPair.right, user.id),
        ),
      ),
  };
};
