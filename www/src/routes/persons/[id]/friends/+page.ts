import { error } from "@sveltejs/kit";
import { getUserFriends } from "$lib/friends.remote";
import { getPerson } from "$lib/persons.remote";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data: { currentUser }, params }) => {
  (await getPerson(params.id)) ?? error(404);
  return {
    currentUser,
    friends: getUserFriends(params.id),
  };
};
