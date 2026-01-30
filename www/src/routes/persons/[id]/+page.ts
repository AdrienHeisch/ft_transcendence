import { error } from "@sveltejs/kit";
import { getUserFriends } from "$lib/friends.remote";
import { getPerson } from "$lib/persons.remote";
import { getPets } from "$lib/pets.remote";
import { getPosts } from "$lib/posts.remote";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({
  data: { currentUser },
  params: { id: user },
}) => {
  return {
    currentUser,
    user: (await getPerson(user)) ?? error(404),
    friends: getUserFriends(user),
    pets: getPets({
      owner: user,
      search: "",
      species: null,
      sortBy: "name",
    }),
    posts: getPosts({ author: user }),
  };
};
