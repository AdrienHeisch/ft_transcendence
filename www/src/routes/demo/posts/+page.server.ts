import { error } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    error(403, "Not logged in");
  }
  return {
    posts: db
      .select()
      .from(schema.post)
      .leftJoin(schema.user, eq(schema.user.id, schema.post.author))
      .orderBy(desc(schema.post.postedAt)),
  };
};
