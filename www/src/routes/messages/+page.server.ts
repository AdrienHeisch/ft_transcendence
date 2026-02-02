import { eq, or } from "drizzle-orm";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const currentUser = requireLogin();
  return {
    user: currentUser,
    chats: db
      .select()
      .from(schema.friendsPair)
      .where(
        or(
          eq(schema.friendsPair.left, currentUser.id),
          eq(schema.friendsPair.right, currentUser.id),
        ),
      ),
  };
};
