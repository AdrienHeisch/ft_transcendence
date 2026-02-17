import { getPost } from "$lib/posts.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { id } }) => {
  const post = await getPost(id);
  return new Response(JSON.stringify(post));
};
