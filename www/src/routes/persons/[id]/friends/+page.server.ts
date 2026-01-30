import { eq } from "drizzle-orm";
import { getRequestEvent } from "$app/server";
import { getUserFriends } from "$lib/friends.remote";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const { locals } = getRequestEvent();
  const currentUser = locals.user;
  return {
    user: db.select().from(schema.user).where(eq(schema.user.id, params.id)),
    friends: getUserFriends(params.id),
    currentUser,
  };
};
