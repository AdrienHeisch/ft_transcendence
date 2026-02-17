import { getPostComments } from "$lib/posts.remote";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { id } }) => {
  const comments = await getPostComments(id);
  return new Response(JSON.stringify(comments));
};
