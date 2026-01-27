import { desc, eq, getTableColumns } from "drizzle-orm";
import { query } from "$app/server";
import * as schema from "$lib/server/db/schema";
import { db } from "./server/db";

export const getPosts = query(() => {
  return db
    .select({
      ...getTableColumns(schema.post),
      author: { ...getTableColumns(schema.user) },
    })
    .from(schema.post)
    .innerJoin(schema.user, eq(schema.user.id, schema.post.author))
    .orderBy(desc(schema.post.postedAt));
});
