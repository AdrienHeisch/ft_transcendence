import { eq, or } from "drizzle-orm";
import { requireLogin } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const currentUser = requireLogin();
  return {
    currentUser,
    chats: db
      .select()
      .from(schema.usersPair)
      .where(
        or(
          eq(schema.usersPair.left, currentUser.id),
          eq(schema.usersPair.right, currentUser.id),
        ),
      ),
  };
};
