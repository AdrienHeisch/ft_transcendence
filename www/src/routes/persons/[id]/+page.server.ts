import { desc, eq, getTableColumns } from "drizzle-orm";
import { getPets } from "$lib/pets.remote";
import { getCurrentUser } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { getUserFriends } from "$lib/server/db/utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const currentUser = getCurrentUser();
  return {
    user: db.select().from(schema.user).where(eq(schema.user.id, params.id)),
    friends: getUserFriends(params.id),
    pets: getPets({
      owner: params.id,
      search: "",
      species: null,
      sortBy: "name",
    }),
    currentUser,
    posts: db
      .select({
        ...getTableColumns(schema.post),
        author: { ...getTableColumns(schema.user) },
      })
      .from(schema.post)
      .where(eq(schema.post.author, params.id))
      .innerJoin(schema.user, eq(schema.user.id, schema.post.author))
      .orderBy(desc(schema.post.postedAt)),
  };
};
