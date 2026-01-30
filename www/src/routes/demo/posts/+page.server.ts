import { desc, eq } from "drizzle-orm";
import { isLoggedIn } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    isLoggedIn: isLoggedIn(),
    posts: db
      .select()
      .from(schema.post)
      .leftJoin(schema.user, eq(schema.user.id, schema.post.author))
      .orderBy(desc(schema.post.postedAt)),
  };
};
