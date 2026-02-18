import { error } from "@sveltejs/kit";
import { getPost } from "$lib/posts.remote";
import { promiseToRemoteQuery } from "$lib/typeUtils";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({
  data: { currentUser },
  params: { id },
}) => {
  const post = getPost(id);
  if (!(await post)) error(404);
  return {
    currentUser,
    post: promiseToRemoteQuery(post),
  };
};
