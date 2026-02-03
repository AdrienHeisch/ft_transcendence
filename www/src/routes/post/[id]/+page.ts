import { error, type RemoteQuery } from "@sveltejs/kit";
import { getPost, type PostData } from "$lib/posts.remote";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({
  data: { currentUser },
  params: { id },
}) => {
  const post = getPost(id);
  if (!(await post)) error(404);
  return {
    currentUser,
    post: post as RemoteQuery<PostData>,
  };
};
