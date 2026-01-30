import { desc, eq, getTableColumns } from "drizzle-orm";
import { getUserFriends } from "$lib/friends.remote";
import { getPets } from "$lib/pets.remote";
import { getCurrentUser } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params: { id: userId } }) => {
  const currentUser = getCurrentUser();
  return {
    currentUser,
    user: db.select().from(schema.user).where(eq(schema.user.id, userId)),
    friends: getUserFriends(userId),
    pets: getPets({
      owner: userId,
      search: "",
      species: null,
      sortBy: "name",
    }),
    posts: db //TODO use remote function
      .select({
        ...getTableColumns(schema.post),
        author: { ...getTableColumns(schema.user) },
      })
      .from(schema.post)
      .where(eq(schema.post.author, userId))
      .innerJoin(schema.user, eq(schema.user.id, schema.post.author))
      .orderBy(desc(schema.post.postedAt)),
  };
};
